const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const C = require('./const');

/**
 * フォントの設定を読み込む
 * @param fontName フォント名
 */
exports.loadConfig = (fontName) => {
  return new Promise((resolve, reject) => {
    const configFilePath = path.join(C.ROOT_DIR, 'fonts', fontName, '_config.yml');

    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(yaml.safeLoad(data));
    });
  });
};
