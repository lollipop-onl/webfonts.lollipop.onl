const { Worker, isMainThread, workerData } = require('worker_threads');
const fontRanger = require('font-ranger/lib/font-ranger');
const UNICODE_RANGES = require('./_unicode-ranges');

const DEFAULT_PARAMETER = {
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
} else {
  (async () => {
    const { ranges, index } = workerData;
    const suffix = `${index}`.padStart(3, '0');

    console.log(`BEGIN: ChildThread#${index} process`);

    try {
      await fontRanger({
        ...DEFAULT_PARAMETER,
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
