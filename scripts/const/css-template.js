const _ = require('lodash');
const C = require('../const');

module.exports = _.template(
  `
<% const { fontFile = '', fontStyle = 'normal', fontWeight = 400, fontDisplay = 'swap', locals = [] } = font %>
<% const fontFileName = fontFile.replace(/^(.*)\\..*$/, '$1') %>

<% _.forEach(C.UNICODE_RANGES, function(ranges, index) { %>

@font-face {
  font-family: <%= fontName %>;
  font-style: <%= fontStyle %>;
  font-weight: <%= fontWeight %>;
  font-display: <%= fontDisplay %>;
  src:
    <% _.forEach(locals, function(local) { %>
    local('<%= local %>'),
    <% }) %>
    url('./<%= fontName %>/<%= fontFileName %>.<%= index %>.custom-subset.woff2') format('woff2');
  unicode-range: <%= ranges.join(', ') %>;
}

<% }) %>
  `
    .replace(/\n+/, '\n')
    .replace(/^\n+|\n+$/, ''),
  {
  imports: {
    C,
  },
});
