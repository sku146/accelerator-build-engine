'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _development = require('./development.config');

var _development2 = _interopRequireDefault(_development);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  contentBase: _development2['default'].contentBase,
  hot: true,
  inline: true
};
module.exports = exports['default'];
//# sourceMappingURL=webpack.dev.server.config.js.map