#!/usr/bin/env node
'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _constants = require('./lib/constants');

var _webpack = require('./lib/webpack');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

const currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 6) {
  console.error(_chalk2['default'].white.bgRed(_constants.MSG.NODE()(currentNodeVersion)));
  process.exit(1);
}

if (currentNodeVersion.split('.')[0] > 6) {
  console.warn(_chalk2['default'].white.bgRed(_constants.MSG.HNODE()(currentNodeVersion)));
}

const result = (0, _webpack.isValidExecute)();
if (result && !result.status) {
  console.error(_chalk2['default'].white.bgRed(result.msg));
  process.exit(1);
}

process.env.NODE_ENV = process.env.BABEL_ENV = _constants.ENV.COMPILE;

(0, _webpack.series)((0, _webpack.getCompileTask)(__dirname), err => {
  if (err) {
    console.error(_chalk2['default'].white.bgRed(err));
    process.exit(1);
  }

  _commander2['default'].version(_package2['default'].version).option('-s, --server', 'Execute development webpack server').option('-b, --build [build]', 'Execute specific (development|production) webpack build task (default: development)', /^(development|production)$/i, 'development').option('-l, --lint [lint]', 'Execute specific (all|configs|base|test|style) lint task(s) (default: all)', /^(all|configs|base|test|style)$/i, 'all').option('-t, --test [test]', 'Execute specific (unit|watch|watchAll) unit & coverage test task(s)  (default: unit)', /^(unit|watch|watchAll)$/i, 'unit').option('-c, --scout [scout]', 'Execute specific Journey and Brand release bundle scout').option('-d, --doc', 'Execute technicial document generator').parse(process.argv);

  const executor = require('./lib/webpack/executor');
  const args = process.argv.slice(2);

  if (args && !args.length) {
    console.error(_chalk2['default'].red('Please select anyone of the below options.'));
    executor.executeHelp();
    return;
  }

  executor.executeCommand(_commander2['default'], args, __dirname);
});

