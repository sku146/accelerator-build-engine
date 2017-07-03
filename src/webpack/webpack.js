/* eslint no-console: ["error", { allow: ["info", "error"] }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/
import fs from 'fs';
import chalk from 'chalk';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import forEach from 'lodash/forEach';
import split from 'lodash/split';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import indexOf from 'lodash/indexOf';
import spawn from 'cross-spawn';
import {
  CLI_PATH,
  MSG,
  CLI_COMMAND,
} from '../constants';

const exitError = (msg = '') => {
  console.error(chalk.white.bgRed(msg));
  process.exit(1);
};

const successInfo = (msg = '') => {
  console.info(chalk.bgYellow.bold(msg));
};

const exec = (cmd, cb) => {
  const props = split(cmd, /\s+/g);
  const command = props[0];
  const args = props.slice(1);
  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('close', (code, signal) => {
    if (isFunction(cb)) {
      let err = false;
      if (code !== 0) {
        err = new Error(MSG.COMMAND()(command, args.join(' ')));
        err.code = code;
        err.signal = signal;
      }
      cb(err);
      return;
    }
    if (code !== 0) {
      exitError(MSG.COMMAND()(command, args.join(' ')));
    }
  });
};

const series = (cmds = [], cb) => {
  if (isEmpty(cmds)) {
    return;
  }
  const next = () => {
    let cmd = cmds.shift();
    if (isPlainObject(cmd)) {
      successInfo(cmd.msg);
      cmd = cmd.command;
    }
    exec(cmd, (err) => {
      if (err) {
        cb(err);
        return;
      }
      if (cmds.length) {
        next();
      } else {
        cb(false);
      }
    });
  };
  next();
};

const isValidDirPath = (path = '') => {
  if (isEmpty(path)) {
    return false;
  }
  try {
    const stats = fs.lstatSync(path);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
};

const isValidFilePath = (path = '') => {
  if (isEmpty(path)) {
    return false;
  }
  try {
    const stats = fs.lstatSync(path);
    return stats.isFile();
  } catch (e) {
    return false;
  }
};

const validateDirs = (folders = []) => {
  if (isEmpty(folders)) {
    return MSG.FAIL;
  }
  let output = MSG.SUCCESS;
  forEach(folders, (folder) => {
    if (!isValidDirPath(folder)) {
      const folderName = last(split(folder, '/'));
      output = { status: false, msg: MSG.folder()(folderName) };
    }
  });
  return output;
};

const validateFiles = (files = []) => {
  if (isEmpty(files)) {
    return MSG.FAIL;
  }
  let output = MSG.SUCCESS;
  forEach(files, (file) => {
    if (!isValidFilePath(file)) {
      const fileName = last(split(file, '/'));
      output = { status: false, msg: MSG.file()(fileName) };
    }
  });
  return output;
};

const isValidExecute = () => {
  if (isEmpty(CLI_PATH.VALIDATE)) {
    return MSG.FAIL;
  }
  const dirResult = validateDirs(CLI_PATH.VALIDATE.folders || []);
  if (dirResult && !dirResult.status) {
    return dirResult;
  }
  const fileResult = validateFiles(CLI_PATH.VALIDATE.files || []);
  if (fileResult && !fileResult.status) {
    return fileResult;
  }
  return MSG.SUCCESS;
};

const isValidTask = (task = '') => {
  if (isEmpty(task)) {
    return MSG.FAIL;
  }
  const tasks = {
    eslint: () => validateFiles([CLI_PATH.ESLINT_CONFIG_PATH]),
    style: () => validateFiles([CLI_PATH.STYLE_CONFIG_PATH]),
    test: () => validateFiles([CLI_PATH.TEST_CONFIG_PATH]),
    doc: () => validateFiles([CLI_PATH.TECH_DOC_PATH]),
  };
  const taskFn = tasks[task] || (() => MSG.FAIL);
  return taskFn();
};

const validateLintExecute = (tasks = []) => {
  if (isEmpty(tasks)) {
    exitError(MSG.FAIL.msg);
  }
  forEach(tasks, (task) => {
    const lint = (indexOf(CLI_PATH.VALIDATE.eslintTasks, task)) ? 'eslint' : task;
    const lintTask = isValidTask(lint);
    if (lintTask && !lintTask.status) {
      exitError(lintTask.msg);
    }
  });
};

const getCompileTask = (dirPath = '') => {
  if (isEmpty(dirPath)) {
    return MSG.NOT_FIND;
  }
  const path = `${dirPath}/${CLI_PATH.CONFIG_LOCAL_PATH}`;
  return split(CLI_COMMAND.compile()(path), '&&');
};

export default {
  exitError,
  isValidDirPath,
  isValidFilePath,
  validateLintExecute,
  validateDirs,
  validateFiles,
  isValidExecute,
  isValidTask,
  getCompileTask,
  exec,
  series,
};
