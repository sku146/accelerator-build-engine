'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('../common.config');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  appJourney: {
    entry: {
      app: ['react-hot-loader/patch', 'webpack-dev-server/client?' + _common2['default'].protocol + '://' + _common2['default'].host + ':' + _common2['default'].port + '/', 'webpack/hot/only-dev-server', './src/journeys/appJourney/app.mount.jsx']
    },
    output: {
      foldersFilesMap: {
        scripts: {
          app: 'app.mount'
        }
      }
    },
    htmlOutput: {
      fileName: 'index.html',
      template: 'src/journeys/appJourney/appJourney.ejs'
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=appJourney.development.config.js.map