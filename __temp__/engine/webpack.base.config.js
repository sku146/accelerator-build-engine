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
      assets: _path2['default'].resolve('' + process.cwd(), 'src/assets'),
      components: _path2['default'].resolve('' + process.cwd(), 'src/components'),
      journeys: _path2['default'].resolve('' + process.cwd(), 'src/journeys'),
      copies: _path2['default'].resolve('' + process.cwd(), 'src/copies'),
      styles: _path2['default'].resolve('' + process.cwd(), 'src/styles'),
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