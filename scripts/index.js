const _ = require('lodash');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const C = require("./const");
const subset = require('./subset');
const { loadConfig } = require('./utils');

(async () => {
  const configFiles = await fg(path.join(C.ROOT_DIR, 'fonts', '**/config.yml'));
  const fontNames = configFiles
    .map((filePath) => filePath.replace(/^.*\/(.*)\/config.yml$/, '$1'))
    .filter((fontName) => fontName && !/\//.test(fontName));
  const configs = await Promise.all(fontNames.map((fontName) => loadConfig(fontName)));

  await Promise.all(configs.flatMap((config, index) => {
    const { fonts = [] } = config;
    const fontName = fontNames[index];

    return fonts.map((font) => subset(fontName, font));
  }));

  fontNames.forEach((fontName, index) => {
    const { fonts } = configs[index];

    const css = C.CSS_TEMPLATE({
      fonts,
      fontName,
    });

    console.log(css);

    fs.writeFileSync(path.join(C.ROOT_DIR, 'fonts', `${fontName}.css`), css);
  });
})();
