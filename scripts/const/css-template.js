const _ = require('lodash');
const C = require('../const');

module.exports = _.template(`
<% _.forEach(fonts, function(font) { %>
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
    url('/<%= fontFileName %>.<%= index %>.woff2') format('woff2');
  unicode-range: <%= ranges.join(', ') %>;
}

<% }) %>

<% }) %>
`, {
  variable: {
    C,
  },
});
