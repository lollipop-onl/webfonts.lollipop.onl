import { Worker, isMainThread, workerData } from 'worker_threads';
import fontRanger from 'font-ranger/lib/font-ranger';
import path from 'path';
import * as C from './const';

let exportModule: any;

if (isMainThread) {
  exportModule = (fontName: string, config: any): Promise<void> => {
    return new Promise((resolve) => {
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

          if (completedCount >= C.UNICODE_RANGES.length) {
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
    const suffix = `${index}`.padStart(3, '0');

    console.log(`BEGIN: ChildThread#${index} process`);

    try {
      await fontRanger({
        ...C.BASE_SUBSET_PARAMETER,
        ...fontConfig,
        fontFile: path.resolve(C.ROOT_DIR, 'fonts', fontName, fontFile),
        ranges,
        fontName: `${fontName}.${suffix}`
      });
    } catch (err) {
      console.error(`ERROR: ChildThread#${index} process`);
      console.error(err);
    }

    console.log(`FINISH: ChildThread#${index} process`);
  })();
}

export default exportModule;
