const path = require('path');

/** Unicode範囲定義 */
exports.UNICODE_RANGES = require('./unicode-ranges');

/** ルートディレクトリパス */
exports.ROOT_DIR = path.resolve(__dirname, '../..');

/** ベースのサブセットパラメータ */
exports.BASE_SUBSET_PARAMETER = {
  outputFolder: './output',
  urlPrefix: '/',
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap',
  keepFormat: false,
  addWoff: false,
  skipCss: false,
  copyOriginal: false,
};