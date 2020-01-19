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
  //
  // await Promise.all(configs.flatMap((config, index) => {
  //   const { fonts = [] } = config;
  //   const fontName = fontNames[index];
  //
  //   return fonts.map((font) => subset(fontName, font));
  // }));

  for (let i = 0; i < configs.length; i++) {
    const { fonts = [] } = configs[i];
    const fontName = fontNames[i];

    await Promise.all(fonts.map((font) => subset(fontName, font)));
  }

  fontNames.forEach((fontName, index) => {
    const { fonts, license = '' } = configs[index];

    fonts.forEach((font) => {
      const { fontWeight = 400 } = font;
      const css = C.CSS_TEMPLATE({
        font,
        fontName,
      });
      const licensedCss = C.WEBFONT_LICENSE_CSS({
        license,
        css
      });
      const cssFileName = `${fontName}.${fontWeight}.css`;

      fs.writeFileSync(path.join(C.OUTPUT_DIR, cssFileName), licensedCss, 'utf8');
    });

    const allInOneCSS = fonts.map((font) => {
      return C.CSS_TEMPLATE({
        font,
        fontName,
      });
    });
    const licensedCss = C.WEBFONT_LICENSE_CSS({
      license,
      css: allInOneCSS,
    });

    fs.writeFileSync(path.join(C.OUTPUT_DIR, `${fontName}.css`), licensedCss, 'utf8');
  });

  fs.writeFileSync(path.join(C.OUTPUT_DIR, 'unicode-ranges.json'), JSON.stringify(C.UNICODE_RANGES), 'utf8');

  const catalog = configFiles.map((config, index) => {
    const { fonts = [] } = config;
    const fontName = fontNames[index];

    return {
      fontName,
      weights: fonts.map(({ fontWeight }) => fontWeight),
    };
  });
  fs.writeFileSync(path.join(C.OUTPUT_DIR, 'catalog.json'), JSON.stringify(catalog), 'utf8');
})();
