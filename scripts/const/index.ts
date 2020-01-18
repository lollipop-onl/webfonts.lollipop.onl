import path from 'path';

/** Unicode範囲定義 */
export * from './unicode-ranges';

/** ルートディレクトリパス */
export const ROOT_DIR = path.resolve(__dirname, '../..');

/** ベースのサブセットパラメータ */
export const BASE_SUBSET_PARAMETER = {
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
