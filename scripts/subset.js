const { Worker, isMainThread, workerData } = require('worker_threads');
const fontRanger = require('font-ranger/lib/font-ranger');
const path = require('path');
const C = require('./const');

if (isMainThread) {
  module.exports = (fontName, config) => {
    return new Promise((resolve) => {
      console.log(`BEGIN: MainThread process (${fontName})`);

      let completedCount = 0;

      C.UNICODE_RANGES.forEach((ranges, index) => {
        const worker = new Worker(__filename, {
          workerData: {
            fontName,
            config,
            ranges,
            index,
          },
        });

        worker.on('exit', () => {
          completedCount++;

          console.log(`FINISH: ChildThread process (${fontName}/${config.fontFile}) ${completedCount}/${C.UNICODE_RANGES.length}`);

          if (completedCount >= C.UNICODE_RANGES.length) {
            console.log(`FINISH: MainThread process (${fontName}/${config.fontFile})`);

            resolve();
          }
        });
      });
    });
  };
} else {
  (async () => {
    const { fontName, config, ranges, index } = workerData;
    const { fontFile, ...fontConfig } = config;
    const fontFileName = fontFile.replace(/^(.*)\..*$/, '$1');
    const suffix = `${index}`.padStart(3, '0');

    console.log(`BEGIN: ChildThread#${index} process (${fontFile})`);

    try {
      await fontRanger({
        ...C.BASE_SUBSET_PARAMETER,
        ...fontConfig,
        fontFile: path.resolve(C.ROOT_DIR, 'fonts', fontName, fontFile),
        ranges,
        fontName: `${fontFileName}.${suffix}`
      });
    } catch (err) {
      console.error(`ERROR: ChildThread#${index} process (${fontFile})`);
      console.error(err);
    }
  })();
}
