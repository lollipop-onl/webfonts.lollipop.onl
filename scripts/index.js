// const fontRanger = require('font-ranger/lib/font-ranger');
// const UNICODE_RANGES = require('./unicode-ranges');
//
// const DEFAULT_PARAMETER = {
//   fontFile: 'docs/GenEiAntiqueNv5-M.ttf',
//   outputFolder: './docs',
//   urlPrefix: '/fonts/',
//   fontFamily: 'GenEiAntique',
//   fontWeight: 400,
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   keepFormat: false,
//   addWoff: true,
//   skipCss: false,
//   copyOriginal: false,
//   locals: ['GenEiAntiqueNv5-M'],
// };
//
// console.log('happen');
//
// UNICODE_RANGES.forEach((ranges, index) => {
//   const parameter = {
//     ...DEFAULT_PARAMETER,
//     ranges,
//     fontName: `GenEiAntique.${index}`
//   };
//
//   fontRanger(parameter);
// });

const { Worker, isMainThread, workerData } = require('worker_threads');
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

let completedProcessCount = 0;

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

    console.log(`BEGIN: ChildThread#${index} process`);

    try {
      await fontRanger({
        ...DEFAULT_PARAMETER,
        ranges,
        fontName: `GenEiAntique.${index}`
      });
    } catch (err) {
      console.error(`ERROR: ChildThread#${index} process`);
      console.error(err);
    }

    completedProcessCount++;

    console.log(`FINISH: ChildThread#${index} process (${completedProcessCount}/${UNICODE_RANGES.length})`);
  })();
}
