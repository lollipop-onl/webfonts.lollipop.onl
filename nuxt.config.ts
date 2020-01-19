import { Configuration } from '@nuxt/types';

const config: Configuration = {
  mode: 'spa',
  srcDir: 'app',
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxt/http'],
  css: ['reset-css'],
};

module.exports = config;
