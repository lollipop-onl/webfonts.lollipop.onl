const { Worker, isMainThread, workerData } = require('worker_threads');
const fontRanger = require('font-ranger/lib/font-ranger');
const UNICODE_RANGES = require('./unicode-ranges');

const BASE_PARAMETER = {
  fontFile: 'docs/GenEiAntiqueNv5-M.ttf',
  outputFolder: './docs',
  urlPrefix: '/fonts/',
  fontFamily: 'GenEiAntique',
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap',
  keepFormat: false,
  addWoff: false,
  skipCss: false,
  copyOriginal: false,
  locals: ['GenEiAntiqueNv5-M'],
};

if (isMainThread) {
  /** サブセット化する関数 */
  moodule.exports = (config) => {
    console.log('BEGIN: MainThread process');

    UNICODE_RANGES.forEach((ranges, index) => {
      new Worker(__filename, {
        workerData: {
          ranges,
          index
        }
      });
    });

    console.log('FINISH: MainThread process');
  };
} else {
  (async () => {
    const { parameter, index } = workerData;
    const suffix = `${index}`.padStart(3, '0');

    console.log(`BEGIN: ChildThread#${index} process`);

    try {
      await fontRanger({
        ...BASE_PARAMETER,
        ...parameter,
        ranges,
        fontName: `GenEiAntique.${suffix}`
      });
    } catch (err) {
      console.error(`ERROR: ChildThread#${index} process`);
      console.error(err);
    }

    console.log(`FINISH: ChildThread#${index} process`);
  })();
}
