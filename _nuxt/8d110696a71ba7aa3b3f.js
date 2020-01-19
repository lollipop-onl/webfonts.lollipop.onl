(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{187:function(e,t,n){"use strict";n.r(t);n(25),n(15),n(52),n(33);var o=n(3),r=(n(181),n(39)),c=n(65),l=n(91),f=n(50),d=n(90),h=n(14),m=n(179),v=(n(97),n(127),n(183),function(e,t,n,desc){var o,r=arguments.length,c=r<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(c=(r<3?o(c):r>3?o(t,n,c):o(t,n))||c);return r>3&&c&&Object.defineProperty(t,n,c),c}),y=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"toCharacter",value:function(e){var t=Number.parseInt(e.replace(/^U\+/,"0x"),16);return String.fromCharCode(t)}}]),t}(m.Vue);v([Object(m.Prop)({type:Array,required:!0})],y.prototype,"unicodeRanges",void 0),v([Object(m.Prop)({type:Number,required:!0})],y.prototype,"index",void 0);var j=y=v([m.Component],y),O=n(38),R=Object(O.a)(j,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.unicodeRanges,(function(t,i){return i===e.index?n("ul",e._l(t,(function(t){return n("li",[e._v(e._s(e.toCharacter(t)))])})),0):e._e()})),0)}),[],!1,null,"265516b4",null).exports,_=function(e,t,n,desc){var o,r=arguments.length,c=r<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(c=(r<3?o(c):r>3?o(t,n,c):o(t,n))||c);return r>3&&c&&Object.defineProperty(t,n,c),c},w=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(l.a)(this,Object(f.a)(t).apply(this,arguments))).catalog=[],e.unicodeRanges=[],e.unicodeIndex=0,e.selectedFontName="",e.selectedFontWeight=400,e}var n,h,m;return Object(d.a)(t,e),Object(c.a)(t,[{key:"onChangeFontName",value:function(e){var t=this,n=this.catalog.find((function(e){return e.fontName===t.selectedFontName}));n&&(n.weights.some((function(e){return e===t.selectedFontWeight}))||(this.selectedFontWeight=400))}},{key:"beforeMount",value:(m=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([this.fetchCatalog(),this.fetchUnicodeRanges()]);case 2:this.addWebfontCss();case 3:case"end":return e.stop()}}),e,this)}))),function(){return m.apply(this,arguments)})},{key:"fetchCatalog",value:(h=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$http.$get("catalog.json");case 2:this.catalog=e.sent,this.selectedFontName=this.catalog[0].fontName;case 4:case"end":return e.stop()}}),e,this)}))),function(){return h.apply(this,arguments)})},{key:"fetchUnicodeRanges",value:(n=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$http.$get("unicode-ranges.json");case 2:this.unicodeRanges=e.sent;case 3:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"addWebfontCss",value:function(){this.catalog.forEach((function(e){var t=e.fontName,n=document.createElement("link");n.setAttribute("rel","stylesheet"),n.setAttribute("href","https://lollipop-onl.github.io/webfonts.lollipop.onl/".concat(t,".css")),document.head.appendChild(n)}))}},{key:"fontWeights",get:function(){var e=this,t=this.catalog.find((function(t){return t.fontName===e.selectedFontName}));return t?t.weights:[]}},{key:"fontStyle",get:function(){return{fontFamily:this.selectedFontName,fontWeight:this.selectedFontWeight}}}]),t}(m.Vue);_([Object(m.Watch)("selectedFontName")],w.prototype,"onChangeFontName",null);var x=w=_([Object(m.Component)({components:{RangePreview:R}})],w),N=Object(O.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("hello.")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedFontName,expression:"selectedFontName"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.selectedFontName=t.target.multiple?n:n[0]}}},e._l(e.catalog,(function(t){var o=t.fontName;return n("option",{domProps:{value:o}},[e._v(e._s(o))])})),0),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedFontWeight,expression:"selectedFontWeight"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.selectedFontWeight=t.target.multiple?n:n[0]}}},e._l(e.fontWeights,(function(t){return n("option",{domProps:{value:t}},[e._v(e._s(t))])})),0),n("select",{directives:[{name:"model",rawName:"v-model",value:e.unicodeIndex,expression:"unicodeIndex"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.unicodeIndex=t.target.multiple?n:n[0]}}},e._l(e.unicodeRanges,(function(t,i){return n("option",{domProps:{value:i}},[e._v(e._s(i))])})),0),n("textarea",{style:e.fontStyle}),n("RangePreview",{style:e.fontStyle,attrs:{unicodeRanges:e.unicodeRanges,index:e.unicodeIndex}})],1)}),[],!1,null,"598a7a38",null);t.default=N.exports}}]);