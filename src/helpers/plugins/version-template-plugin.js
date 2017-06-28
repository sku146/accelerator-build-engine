/* eslint no-console: ["error", { allow: ["info", "error"] }] */
import fs from 'fs';
import isEmpty from 'lodash/isEmpty';

class VersionTemplatePlugin {
  constructor(options = {}) {
    this.journey = options.journey || '';
    this.brand = options.brand || '';
    this.filePath = options.filePath || '';
    this.noHash = options.noHash || false;
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      if (!isEmpty(this.filePath)) {
        const version = this.noHash ? `${this.journey}${this.brand}` : `${this.journey}${this.brand}@${stats.hash}`;
        const currentDate = new Date();
        const date = `buildDate:${currentDate}`;
        const content = `${version}\n${date}`;
        try {
          fs.writeFileSync(this.filePath, content);
        } catch (ex) {
          console.error(ex);
        }
      }
    });
  }
}

export default VersionTemplatePlugin;
