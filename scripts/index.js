const fontRanger = require('font-ranger/lib/font-ranger');
const UNICODE_RANGES = require('./unicode-ranges');

const DEFAULT_PARAMETER = {
  fontFile: 'docs/GenEiAntiqueNv5-M.ttf',
  outputFolder: './docs',
  urlPrefix: '/fonts/',
  fontFamily: 'GenEiAntique',
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap',
  keepFormat: false,
  addWoff: true,
  skipCss: false,
  copyOriginal: false,
  locals: ['GenEiAntiqueNv5-M'],
};

console.log('happen');

UNICODE_RANGES.forEach((range, index) => {
  const parameter = {
    ...DEFAULT_PARAMETER,
    ranges: UNICODE_RANGES,
    fontName: `GenEiAntique.${index}`
  };

  fontRanger(parameter);
});
