const _ = require('lodash');
const C = require('../const');

/** CSSテンプレート */
exports.CSS_TEMPLATE = _.template(
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

/** SIL Open Font License (OFL) ライセンス表示 */
exports.WEBFONT_LICENSE_OFL = _.template(
  `
/*
 * "<%= fontName %>" licensed under the SIL Open Font License
 * <%= url %>
 */
<%= css %>
  `
);

/** IPAフォントライセンスv1.0 ライセンス表示 */
exports.WEBFONT_LICENSE_IPA = _.template(
  `
/*
 * "<%= fontName %>" licensed under the IPA Font License Agreement v1.0
 * {%= url %}
 * http://ipafont.ipa.go.jp/
 * http://ipafont.ipa.go.jp/ipa_font_license_v1.html
 */
<%= css %>
  `
);

/** Apache License 2.0 ライセンス表示 */
exports.WEBFONT_LICENSE_APACHE = _.template(
  `
/*
 * Copyright (C) 2014 <%= author %>
 *      <%= url %>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<%= css %>
  `
);

/** ライセンス表示をCSSに追加するテンプレート */
exports.WEBFONT_LICENSE_CSS = _.template(
  `
<% if (license) { %>
/*
<% license.split('\\n').forEach(function (line) { %> * <%= line %>
<% }); %>
 */
<% } %>
<%= css %>
  `
);
