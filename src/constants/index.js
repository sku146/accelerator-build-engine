import forEach from 'lodash/forEach';

export const ENV = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
  COMPILE: 'compile',
};

export const DEFAULT_VALUE = {
  STYLESHEET: '',
  LINT: 'all',
  SCOUT: 'all',
  VERSION_NAME: 'version.txt',
};

export const stringTemplate = (strings, ...keys) => ((...values) => {
  const dict = values[values.length - 1] || {};
  const result = [strings[0]];
  forEach(keys, (key, i) => {
    const value = Number.isInteger(key) ? values[key] : dict[key];
    result.push(value, strings[i + 1]);
  });
  return result.join('');
});

export const MSG = {
  folder: () => stringTemplate`"${0}" folder is missing in your project.`,
  file: () => stringTemplate`"${0}" file is missing in your project.`,
  NODE: () => stringTemplate`You are running Node ${0}. \nReact Application Accelerator requires Node 6 or higher. \nPlease update your version of Node.`,
  HNODE: () => stringTemplate`You are running Node ${0}. \nMay be some functionality doesn't works in React Application Accelerator. \nReact Application Accelerator was tested in 6.x Node version.`,
  COMMAND: () => stringTemplate`${0} ${1} failed.`,
  SCOUT: () => stringTemplate`${0} release bundle scout server STARTED...`,
  LINT: () => stringTemplate`${0} lint results`,
  SUCCESS: { status: true, msg: 'success' },
  FAIL: { status: false, msg: 'Root config folder/file has modified, Please re-install the build-engine module.' },
  NOT_FIND: 'echo Unable to find the root path.',
  LINT_EMPTY: 'echo Eslint config is empty.',
  STYLE_LINT_EMPTY: 'echo Style lint config is empty.',
};

export const CLI_PATH = {
  VALIDATE: {
    folders: [
      `${process.cwd()}/configs/engine`,
      `${process.cwd()}/configs`,
    ],
    files: [
      `${process.cwd()}/configs/engine/webpack.prod.config.js`,
      `${process.cwd()}/configs/engine/webpack.dev.server.config.js`,
      `${process.cwd()}/configs/engine/webpack.dev.config.js`,
      `${process.cwd()}/configs/engine/production.config.js`,
      `${process.cwd()}/configs/engine/development.config.js`,
      `${process.cwd()}/configs/engine/common.config.js`,
    ],
    eslintTasks: [
      'configs',
      'base',
      'test',
    ],
  },
  CONFIG_LOCAL_PATH: '__temp__',
  RELEASE_PATH: 'content/',
  TEST_CONFIG_PATH: `${process.cwd()}/configs/engine/jest.config.json`,
  TECH_DOC_PATH: `${process.cwd()}/configs/engine/conf.json`,
  ESLINT_CONFIG_PATH: `${process.cwd()}/configs/engine/eslint.config.js`,
  STYLE_CONFIG_PATH: `${process.cwd()}/.sass-lint.yml`,
};

export const CLI_COMMAND = {
  compile: () => stringTemplate`./node_modules/.bin/rimraf ${0}&&./node_modules/.bin/babel configs --out-dir ${0} -s -q`,
  build: () => stringTemplate`./node_modules/.bin/rimraf ${1}&&./node_modules/.bin/cross-env ./node_modules/.bin/webpack --config ${0}/lib/webpack/webpack.dev.config.js`,
  server: () => stringTemplate`./node_modules/.bin/cross-env node ${0}/lib/webpack/webpack-dev-server.js`,
  release: () => stringTemplate`./node_modules/.bin/rimraf ${1}&&./node_modules/.bin/cross-env ./node_modules/.bin/webpack --config ${0}/lib/webpack/webpack.prod.config.js`,
  eslint: () => stringTemplate`./node_modules/.bin/eslint ${0} -f table --fix`,
  eslintReport: () => stringTemplate`./node_modules/.bin/eslint ${0} -f checkstyle > checkstyle-result.xml`,
  styleLint: () => stringTemplate`./node_modules/.bin/sass-lint -v -q`,
  eslintTest: () => stringTemplate`./node_modules/.bin/eslint -c specs/.eslintrc ${0} -f table --fix --no-eslintrc`,
  scout: () => stringTemplate`./node_modules/.bin/http-server ${0} -p ${1}`,
  test: './node_modules/.bin/jest --config=configs/engine/jest.config.json',
  testWatch: './node_modules/.bin/jest --config=configs/engine/jest.config.json --watch',
  testWatchAll: './node_modules/.bin/jest --config=configs/engine/jest.config.json --watchAll',
  docGen: './node_modules/.bin/jsdoc -c configs/engine/conf.json -R README.md',
  help: 'build-engine -h',
};
