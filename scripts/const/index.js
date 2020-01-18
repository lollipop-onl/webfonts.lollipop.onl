const path = require('path');

/** Unicode範囲定義 */
exports.UNICODE_RANGES = require('./unicode-ranges');

/** CSS Template */
exports.CSS_TEMPLATE = require('./css-template');

/** ルートディレクトリパス */
exports.ROOT_DIR = path.resolve(__dirname, '../..');

/** ベースのサブセットパラメータ */
exports.BASE_SUBSET_PARAMETER = {
  urlPrefix: '/',
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap',
  keepFormat: false,
  addWoff: false,
  skipCss: true,
  copyOriginal: false,
};
