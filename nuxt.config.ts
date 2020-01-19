import { Configuration } from '@nuxt/types';

const config: Configuration = {
  mode: 'spa',
  srcDir: 'app',
  head: {
    title: 'lollipop.onl Webfonts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxt/http'],
  css: ['reset-css'],
  http: {
    baseURL: '/'
  }
};

module.exports = config;
