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

      fs.writeFileSync(path.join(C.ROOT_DIR, 'output', `${fontName}.${fontWeight}.css`), licensedCss, 'utf8');
    });

    const allInOneCSS = fontNames.flatMap((font) => {
      return C.CSS_TEMPLATE({
        font,
        fontName,
      });
    });
    const licensedCss = C.WEBFONT_LICENSE_CSS({
      license,
      allInOneCSS,
    });

    fs.writeFileSync(path.join(C.ROOT_DIR, 'output', `${fontName}.css`), licensedCss, 'utf8');
  });
})();
