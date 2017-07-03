#!/usr/bin/env node
import chalk from 'chalk';
import {
  MSG, ENV,
} from './lib/constants';
import {
  isValidExecute,
  getCompileTask,
  series,
} from './lib/webpack';

const currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 4) {
  console.error(chalk.white.bgRed(MSG.NODE()(currentNodeVersion)));
  process.exit(1);
}

if (currentNodeVersion.split('.')[0] > 6) {
  console.warn(chalk.white.bgRed(MSG.HNODE()(currentNodeVersion)));
}

const result = isValidExecute();
if (result && !result.status) {
  console.error(chalk.white.bgRed(result.msg));
  process.exit(1);
}

import program from 'commander';
import pkg from './package.json';

process.env.NODE_ENV = process.env.BABEL_ENV = ENV.COMPILE;

series(getCompileTask(__dirname), err => {
  if (err) {
    console.error(chalk.white.bgRed(err));
    process.exit(1);
  }

  program
    .version(pkg.version)
    .option('-s, --server', 'Execute development webpack server')
    .option('-b, --build [build]', 'Execute specific (development|production) webpack build task (default: development)', /^(development|production)$/i, 'development')
    .option('-l, --lint [lint]', 'Execute specific (all|configs|base|test|style) lint task(s) (default: all)', /^(all|configs|base|test|style)$/i, 'all')
    .option('-t, --test [test]', 'Execute specific (unit|watch|watchAll) unit & coverage test task(s)  (default: unit)', /^(unit|watch|watchAll)$/i, 'unit')
    .option('-c, --scout [scout]', 'Execute specific Journey and Brand release bundle scout')
    .option('-d, --doc', 'Execute technicial document generator')
    .parse(process.argv);

  const executor = require('./lib/webpack/executor');
  const args = process.argv.slice(2);

  if (args && !args.length) {
    console.error(chalk.red('Please select anyone of the below options.'));
    executor.executeHelp();
    return;
  }

  executor.executeCommand(program, args, __dirname);
});
