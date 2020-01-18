const _ = require('lodash');
const C = require('../const');

module.exports = _.template(`<% _.forEach(fonts, function(font) { %>hello<% }) %>`);
