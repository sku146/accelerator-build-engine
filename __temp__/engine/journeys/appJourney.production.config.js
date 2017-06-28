'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = {
  appJourney: {
    entry: {
      app: ['./src/journeys/appJourney/app.mount.jsx'],
      styles: {
        lloyds: './src/sass/layouts/appJourney/lloyds.scss',
        bos: './src/sass/layouts/appJourney/bos.scss',
        halifax: './src/sass/layouts/appJourney/halifax.scss'
      }
    },
    output: {
      foldersFilesMap: {
        scripts: {
          app: 'app.mount.min'
        },
        css: {
          styles: 'main.bundle'
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
//# sourceMappingURL=appJourney.production.config.js.map