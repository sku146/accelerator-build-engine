'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  performance: {
    hints: false
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      actions: _path2['default'].resolve('' + process.cwd(), 'src/actions'),
      assets: _path2['default'].resolve('' + process.cwd(), 'src/assets'),
      constants: _path2['default'].resolve('' + process.cwd(), 'src/constants'),
      containers: _path2['default'].resolve('' + process.cwd(), 'src/containers'),
      components: _path2['default'].resolve('' + process.cwd(), 'src/components'),
      journeys: _path2['default'].resolve('' + process.cwd(), 'src/journeys'),
      reducers: _path2['default'].resolve('' + process.cwd(), 'src/reducers'),
      resources: _path2['default'].resolve('' + process.cwd(), 'src/resources'),
      sass: _path2['default'].resolve('' + process.cwd(), 'src/sass'),
      utils: _path2['default'].resolve('' + process.cwd(), 'src/utils')
    }
  },
  module: {
    rules: []
  },
  plugins: []
};
module.exports = exports['default'];
//# sourceMappingURL=webpack.base.config.js.map