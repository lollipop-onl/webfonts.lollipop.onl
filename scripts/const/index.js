const path = require('path');

/** Unicode範囲定義 */
exports.UNICODE_RANGES = require('./unicode-ranges');

/** CSS Template */
const { CSS_TEMPLATE, WEBFONT_LICENSE_CSS } = require('./css-template');

exports.CSS_TEMPLATE = CSS_TEMPLATE;
exports.WEBFONT_LICENSE_CSS = WEBFONT_LICENSE_CSS;

/** ルートディレクトリパス */
exports.ROOT_DIR = path.resolve(__dirname, '../..');

/** 出力ディレクトリパス */
exports.OUTPUT_DIR = path.join(exports.ROOT_DIR, 'output');

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
