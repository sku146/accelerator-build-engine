'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _journeys = require('./journeys');

var _journeys2 = _interopRequireDefault(_journeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = (0, _extends3['default'])({
  contentBase: 'src',
  output: {
    root: 'dist'
  },
  rootTemplate: {
    path: 'src/index.html',
    fileName: 'index.html'
  }
}, _journeys2['default'].development);
module.exports = exports['default'];
//# sourceMappingURL=development.config.js.map