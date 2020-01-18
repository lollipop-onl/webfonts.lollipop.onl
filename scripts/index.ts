import fg from 'fast-glob';
import path from 'path';
import * as C from "./const";
import subset from './subset';
import { loadConfig } from './utils';

(async () => {
  const configFiles = await fg(path.join(C.ROOT_DIR, 'fonts', '**/config.yml'));
  const fontNames = configFiles
    .map((filePath) => filePath.replace(/^.*\/(.*)\/config.yml$/, '$1'))
    .filter((fontName) => fontName && !/\//.test(fontName));
  const configs = await Promise.all(fontNames.map((fontName) => loadConfig(fontName)));

  configs.forEach((config, index) => {
    const fontName = fontNames[index];

    subset(fontName, config);
  });
})();
