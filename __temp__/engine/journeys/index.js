'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _appJourneyDevelopment = require('./appJourney.development.config');

var _appJourneyDevelopment2 = _interopRequireDefault(_appJourneyDevelopment);

var _appJourneyProduction = require('./appJourney.production.config');

var _appJourneyProduction2 = _interopRequireDefault(_appJourneyProduction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  development: (0, _extends3['default'])({}, _appJourneyDevelopment2['default']),
  production: (0, _extends3['default'])({}, _appJourneyProduction2['default'])
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map