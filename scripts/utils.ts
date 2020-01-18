import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import * as C from './const';

/**
 * フォントの設定を読み込む
 * @param fontName フォント名
 */
export const loadConfig = (fontName: string): Promise<void> => {
  return new Promise((resolve, reject): void => {
    const configFilePath = path.join(C.ROOT_DIR, 'fonts', fontName, 'config.yml');

    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(yaml.safeLoad(data));
    });
  });
};
