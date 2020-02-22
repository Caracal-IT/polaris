var __extends=this&&this.__extends||function(){var e=function(r,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var n in r)if(r.hasOwnProperty(n))e[n]=r[n]};return e(r,n)};return function(r,n){e(r,n);function t(){this.constructor=r}r.prototype=n===null?Object.create(n):(t.prototype=n.prototype,new t)}}();var __awaiter=this&&this.__awaiter||function(e,r,n,t){function a(e){return e instanceof n?e:new n((function(r){r(e)}))}return new(n||(n=Promise))((function(n,i){function s(e){try{l(t.next(e))}catch(r){i(r)}}function o(e){try{l(t["throw"](e))}catch(r){i(r)}}function l(e){e.done?n(e.value):a(e.value).then(s,o)}l((t=t.apply(e,r||[])).next())}))};var __generator=this&&this.__generator||function(e,r){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},t,a,i,s;return s={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(e){return function(r){return l([e,r])}}function l(s){if(t)throw new TypeError("Generator is already executing.");while(n)try{if(t=1,a&&(i=s[0]&2?a["return"]:s[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,s[1])).done)return i;if(a=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:n.label++;return{value:s[1],done:false};case 5:n.label++;a=s[1];s=[0];continue;case 7:s=n.ops.pop();n.trys.pop();continue;default:if(!(i=n.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){n.label=s[1];break}if(s[0]===6&&n.label<i[1]){n.label=i[1];i=s;break}if(i&&n.label<i[2]){n.label=i[2];n.ops.push(s);break}if(i[2])n.ops.pop();n.trys.pop();continue}s=r.call(e,n)}catch(o){s=[6,o];a=0}finally{t=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,r=0,n=arguments.length;r<n;r++)e+=arguments[r].length;for(var t=Array(e),a=0,r=0;r<n;r++)for(var i=arguments[r],s=0,o=i.length;s<o;s++,a++)t[a]=i[s];return t};System.register([],(function(e,r){"use strict";return{execute:function(){var n=this;var t="polaris";var a=0;var i=false;var s;var o;var l=false;var f=typeof window!=="undefined"?window:{};var u=f.CSS;var c=f.document||{head:{}};var $={$flags$:0,$resourcesUrl$:"",jmp:function(e){return e()},raf:function(e){return requestAnimationFrame(e)},ael:function(e,r,n,t){return e.addEventListener(r,n,t)},rel:function(e,r,n,t){return e.removeEventListener(r,n,t)}};var v=function(){return(c.head.attachShadow+"").indexOf("[native")>-1}();var h=function(e){return Promise.resolve(e)};var d=function(){try{new CSSStyleSheet;return true}catch(e){}return false}();var m=new WeakMap;var p=function(e){return m.get(e)};var g=e("r",(function(e,r){return m.set(r.$lazyInstance$=e,r)}));var y=function(e){var r={$flags$:0,$hostElement$:e,$instanceValues$:new Map};{r.$onInstancePromise$=new Promise((function(e){return r.$onInstanceResolve$=e}))}{r.$onReadyPromise$=new Promise((function(e){return r.$onReadyResolve$=e}));e["s-p"]=[];e["s-rc"]=[]}return m.set(e,r)};var w=function(e,r){return r in e};var b=function(e){return console.error(e)};var _=new Map;var S=function(e,n,t){var a=e.$tagName$.replace(/-/g,"_");var i=e.$lazyBundleIds$;var s=_.get(i);if(s){return s[a]}return r.import("./"+i+".entry.js"+"").then((function(e){{_.set(i,e)}return e[a]}),b)};var R=new Map;var E=[];var L=[];var x=[];var j=function(e,r){return function(n){e.push(n);if(!i){i=true;if(r&&$.$flags$&4){A(P)}else{$.raf(P)}}}};var N=function(e){for(var r=0;r<e.length;r++){try{e[r](performance.now())}catch(n){b(n)}}e.length=0};var C=function(e,r){var n=0;var t=0;while(n<e.length&&(t=performance.now())<r){try{e[n++](t)}catch(a){b(a)}}if(n===e.length){e.length=0}else if(n!==0){e.splice(0,n)}};var P=function(){a++;N(E);var e=($.$flags$&6)===2?performance.now()+10*Math.ceil(a*(1/22)):Infinity;C(L,e);C(x,e);if(L.length>0){x.push.apply(x,L);L.length=0}if(i=E.length+L.length+x.length>0){$.raf(P)}else{a=0}};var A=function(e){return h().then(e)};var O=j(L,true);var U={};var k=function(e){return e!=null};var I=function(e){e=typeof e;return e==="object"||e==="function"};var M=function(e){return"__sc_import_"+e.replace(/\s|-/g,"_")};var q=e("a",(function(){if(!(u&&u.supports&&u.supports("color","var(--c)"))){return r.import("./p-dbe40eff.system.js").then((function(){if($.$cssShim$=f.__cssshim){return $.$cssShim$.i()}else{return 0}}))}return h()}));var B=e("p",(function(){{$.$cssShim$=f.__cssshim}var e=Array.from(c.querySelectorAll("script")).find((function(e){return new RegExp("/"+t+"(\\.esm)?\\.js($|\\?|#)").test(e.src)||e.getAttribute("data-stencil-namespace")===t}));var n={};if("onbeforeload"in e&&!history.scrollRestoration&&false){return{then:function(){}}}{n.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,f.location.href)).href;T(n.resourcesUrl,e);if(!f.customElements){return r.import("./p-7f10eb01.system.js").then((function(){return n}))}}return h(n)}));var T=function(e,r){var n=M(t);try{f[n]=new Function("w","return import(w);//"+Math.random())}catch(i){var a=new Map;f[n]=function(t){var i=new URL(t,e).href;var s=a.get(i);if(!s){var o=c.createElement("script");o.type="module";o.crossOrigin=r.crossOrigin;o.src=URL.createObjectURL(new Blob(["import * as m from '"+i+"'; window."+n+".m = m;"],{type:"application/javascript"}));s=new Promise((function(e){o.onload=function(){e(f[n].m);o.remove()}}));a.set(i,s);c.head.appendChild(o)}return s}}};var z="{visibility:hidden}.hydrated{visibility:inherit}";var H=function(e,r){if(r===void 0){r=""}{return function(){return}}};var V=function(e,r){{return function(){return}}};var W=new WeakMap;var F=function(e,r,n){var t=R.get(e);if(d&&n){t=t||new CSSStyleSheet;t.replace(r)}else{t=r}R.set(e,t)};var G=function(e,r,n,t){var a=D(r.$tagName$);var i=R.get(a);e=e.nodeType===11?e:c;if(i){if(typeof i==="string"){e=e.head||e;var s=W.get(e);var o=void 0;if(!s){W.set(e,s=new Set)}if(!s.has(a)){{if($.$cssShim$){o=$.$cssShim$.createHostStyle(t,a,i,!!(r.$flags$&10));var l=o["s-sc"];if(l){a=l;s=null}}else{o=c.createElement("style");o.innerHTML=i}e.insertBefore(o,e.querySelector("link"))}if(s){s.add(a)}}}else if(!e.adoptedStyleSheets.includes(i)){e.adoptedStyleSheets=__spreadArrays(e.adoptedStyleSheets,[i])}}return a};var Q=function(e,r,n){var t=H("attachStyles",r.$tagName$);var a=G(v&&e.shadowRoot?e.shadowRoot:e.getRootNode(),r,n,e);if(r.$flags$&10){e["s-sc"]=a;e.classList.add(a+"-h")}t()};var D=function(e,r){return"sc-"+e};var J=e("h",(function(e,r){var n=[];for(var t=2;t<arguments.length;t++){n[t-2]=arguments[t]}var a=null;var i=false;var s=false;var o=[];var l=function(r){for(var n=0;n<r.length;n++){a=r[n];if(Array.isArray(a)){l(a)}else if(a!=null&&typeof a!=="boolean"){if(i=typeof e!=="function"&&!I(a)){a=String(a)}if(i&&s){o[o.length-1].$text$+=a}else{o.push(i?K(null,a):a)}s=i}}};l(n);if(r){{var f=r.className||r.class;if(f){r.class=typeof f!=="object"?f:Object.keys(f).filter((function(e){return f[e]})).join(" ")}}}var u=K(e,null);u.$attrs$=r;if(o.length>0){u.$children$=o}return u}));var K=function(e,r){var n={$flags$:0,$tag$:e,$text$:r,$elm$:null,$children$:null};{n.$attrs$=null}return n};var X=e("H",{});var Y=function(e){return e&&e.$tag$===X};var Z=function(e,r,n,t,a,i){if(n!==t){var s=w(e,r);var o=r.toLowerCase();if(r==="class"){var l=e.classList;var u=re(n);var c=re(t);l.remove.apply(l,u.filter((function(e){return e&&!c.includes(e)})));l.add.apply(l,c.filter((function(e){return e&&!u.includes(e)})))}else if(!s&&r[0]==="o"&&r[1]==="n"){if(r[2]==="-"){r=r.slice(3)}else if(w(f,o)){r=o.slice(2)}else{r=o[2]+r.slice(3)}if(n){$.rel(e,r,n,false)}if(t){$.ael(e,r,t,false)}}else{var v=I(t);if((s||v&&t!==null)&&!a){try{if(!e.tagName.includes("-")){var h=t==null?"":t;if(r==="list"){s=false}else if(n==null||e[r]!=h){e[r]=h}}else{e[r]=t}}catch(d){}}if(t==null||t===false){{e.removeAttribute(r)}}else if((!s||i&4||a)&&!v){t=t===true?"":t;{e.setAttribute(r,t)}}}}};var ee=/\s/;var re=function(e){return!e?[]:e.split(ee)};var ne=function(e,r,n,t){var a=r.$elm$.nodeType===11&&r.$elm$.host?r.$elm$.host:r.$elm$;var i=e&&e.$attrs$||U;var s=r.$attrs$||U;{for(t in i){if(!(t in s)){Z(a,t,i[t],undefined,n,r.$flags$)}}}for(t in s){Z(a,t,i[t],s[t],n,r.$flags$)}};var te=function(e,r,n,t){var a=r.$children$[n];var i=0;var o;var f;if(a.$text$!==null){o=a.$elm$=c.createTextNode(a.$text$)}else{o=a.$elm$=c.createElement(a.$tag$);{ne(null,a,l)}if(k(s)&&o["s-si"]!==s){o.classList.add(o["s-si"]=s)}if(a.$children$){for(i=0;i<a.$children$.length;++i){f=te(e,a,i);if(f){o.appendChild(f)}}}}return o};var ae=function(e,r,n,t,a,i){var s=e;var l;if(s.shadowRoot&&s.tagName===o){s=s.shadowRoot}for(;a<=i;++a){if(t[a]){l=te(null,n,a);if(l){t[a].$elm$=l;s.insertBefore(l,r)}}}};var ie=function(e,r,n,t,a){for(;r<=n;++r){if(t=e[r]){a=t.$elm$;a.remove()}}};var se=function(e,r,n,t){var a=0;var i=0;var s=r.length-1;var o=r[0];var l=r[s];var f=t.length-1;var u=t[0];var c=t[f];var $;while(a<=s&&i<=f){if(o==null){o=r[++a]}else if(l==null){l=r[--s]}else if(u==null){u=t[++i]}else if(c==null){c=t[--f]}else if(oe(o,u)){le(o,u);o=r[++a];u=t[++i]}else if(oe(l,c)){le(l,c);l=r[--s];c=t[--f]}else if(oe(o,c)){le(o,c);e.insertBefore(o.$elm$,l.$elm$.nextSibling);o=r[++a];c=t[--f]}else if(oe(l,u)){le(l,u);e.insertBefore(l.$elm$,o.$elm$);l=r[--s];u=t[++i]}else{{$=te(r&&r[i],n,i);u=t[++i]}if($){{o.$elm$.parentNode.insertBefore($,o.$elm$)}}}}if(a>s){ae(e,t[f+1]==null?null:t[f+1].$elm$,n,t,i,f)}else if(i>f){ie(r,a,s)}};var oe=function(e,r){if(e.$tag$===r.$tag$){return true}return false};var le=function(e,r){var n=r.$elm$=e.$elm$;var t=e.$children$;var a=r.$children$;var i=r.$text$;if(i===null){{{ne(e,r,l)}}if(t!==null&&a!==null){se(n,t,r,a)}else if(a!==null){if(e.$text$!==null){n.textContent=""}ae(n,null,r,a,0,a.length-1)}else if(t!==null){ie(t,0,t.length-1)}}else if(e.$text$!==i){n.data=i}};var fe=function(e,r,n,t){o=e.tagName;var a=r.$vnode$||K(null,null);var i=Y(t)?t:J(null,null,t);i.$tag$=null;i.$flags$|=4;r.$vnode$=i;i.$elm$=a.$elm$=e.shadowRoot||e;{s=e["s-sc"]}le(a,i)};var ue=function(e,r){if(r&&!e.$onRenderResolve$){r["s-p"].push(new Promise((function(r){return e.$onRenderResolve$=r})))}};var ce=function(e,r,n,t){{r.$flags$|=16}if(r.$flags$&4){r.$flags$|=512;return}var a=H("scheduleUpdate",n.$tagName$);var i=r.$ancestorComponent$;var s=r.$lazyInstance$;var o=function(){return $e(e,r,n,s,t)};ue(r,i);var l;if(t){{r.$flags$|=256;if(r.$queuedListeners$){r.$queuedListeners$.forEach((function(e){var r=e[0],n=e[1];return pe(s,r,n)}));r.$queuedListeners$=null}}{l=pe(s,"componentWillLoad")}}a();return ge(l,(function(){return O(o)}))};var $e=function(e,r,n,t,a){var i=H("update",n.$tagName$);var s=e["s-rc"];if(a){Q(e,n,r.$modeName$)}var o=H("render",n.$tagName$);{{fe(e,r,n,ve(t))}}if($.$cssShim$){$.$cssShim$.updateHost(e)}{r.$flags$&=~16}{r.$flags$|=2}if(s){s.forEach((function(e){return e()}));e["s-rc"]=undefined}o();i();{var l=e["s-p"];var f=function(){return he(e,r,n)};if(l.length===0){f()}else{Promise.all(l).then(f);r.$flags$|=4;l.length=0}}};var ve=function(e,r){try{e=e.render&&e.render()}catch(n){b(n)}return e};var he=function(e,r,n){var t=H("postUpdate",n.$tagName$);var a=r.$ancestorComponent$;if(!(r.$flags$&64)){r.$flags$|=64;{ye(e)}t();{r.$onReadyResolve$(e);if(!a){me()}}}else{t()}{r.$onInstanceResolve$(e)}{if(r.$onRenderResolve$){r.$onRenderResolve$();r.$onRenderResolve$=undefined}if(r.$flags$&512){A((function(){return ce(e,r,n,false)}))}r.$flags$&=~(4|512)}};var de=function(e,r){{var n=p(e);var t=n.$hostElement$.isConnected;if(t&&(n.$flags$&(2|16))===2){ce(e,n,r,false)}return t}};var me=function(e){{ye(c.documentElement)}{$.$flags$|=2}};var pe=function(e,r,n){if(e&&e[r]){try{return e[r](n)}catch(t){b(t)}}return undefined};var ge=function(e,r){return e&&e.then?e.then(r):r()};var ye=function(e){return e.classList.add("hydrated")};var we=function(e,r,n){r.$queuedListeners$=r.$queuedListeners$||[];var t=n.map((function(n){var t=n[0],a=n[1],i=n[2];var s=_e(e,t);var o=be(r,i);var l=Se(t);$.ael(s,a,o,l);return function(){return $.rel(s,a,o,l)}}));return function(){return t.forEach((function(e){return e()}))}};var be=function(e,r){return function(n){{if(e.$flags$&256){e.$lazyInstance$[r](n)}else{e.$queuedListeners$.push([r,n])}}}};var _e=function(e,r){if(r&4)return c;if(r&8)return f;return e};var Se=function(e){return(e&2)!==0};var Re=function(e,r){if(e!=null&&!I(e)){if(r&1){return String(e)}return e}return e};var Ee=function(e,r){return p(e).$instanceValues$.get(r)};var Le=function(e,r,n,t){var a=p(e);var i=a.$hostElement$;var s=a.$instanceValues$.get(r);var o=a.$flags$;var l=a.$lazyInstance$;n=Re(n,t.$members$[r][0]);if(n!==s&&(!(o&8)||s===undefined)){a.$instanceValues$.set(r,n);if(l){if(t.$watchers$&&o&128){var f=t.$watchers$[r];if(f){f.forEach((function(e){try{l[e](n,s,r)}catch(t){b(t)}}))}}if((o&(2|16))===2){ce(i,a,t,false)}}}};var xe=function(e,r,n){if(r.$members$){if(e.watchers){r.$watchers$=e.watchers}var t=Object.entries(r.$members$);var a=e.prototype;t.forEach((function(e){var t=e[0],i=e[1][0];if(i&31||n&2&&i&32){Object.defineProperty(a,t,{get:function(){return Ee(this,t)},set:function(e){Le(this,t,e,r)},configurable:true,enumerable:true})}else if(n&1&&i&64){Object.defineProperty(a,t,{value:function(){var e=[];for(var r=0;r<arguments.length;r++){e[r]=arguments[r]}var n=p(this);return n.$onInstancePromise$.then((function(){var r;return(r=n.$lazyInstance$)[t].apply(r,e)}))}})}}));if(n&1){var i=new Map;a.attributeChangedCallback=function(e,r,n){var t=this;$.jmp((function(){var r=i.get(e);t[r]=n===null&&typeof t[r]==="boolean"?false:n}))};e.observedAttributes=t.filter((function(e){var r=e[0],n=e[1];return n[0]&15})).map((function(e){var r=e[0],n=e[1];var t=n[1]||r;i.set(t,r);return t}))}}return e};var je=function(e,t,a,i,s){return __awaiter(n,void 0,void 0,(function(){var n,i,o,l,f,u,c;return __generator(this,(function($){switch($.label){case 0:if(!((t.$flags$&32)===0))return[3,5];t.$flags$|=32;s=S(a);if(!s.then)return[3,2];n=V();return[4,s];case 1:s=$.sent();n();$.label=2;case 2:if(!s.isProxied){{a.$watchers$=s.watchers}xe(s,a,2);s.isProxied=true}i=H("createInstance",a.$tagName$);{t.$flags$|=8}try{new s(t)}catch(v){b(v)}{t.$flags$&=~8}{t.$flags$|=128}i();o=D(a.$tagName$);if(!(!R.has(o)&&s.style))return[3,5];l=H("registerStyles",a.$tagName$);f=s.style;if(!(a.$flags$&8))return[3,4];return[4,r.import("./p-6cef36c5.system.js").then((function(e){return e.scopeCss(f,o,false)}))];case 3:f=$.sent();$.label=4;case 4:F(o,f,!!(a.$flags$&1));l();$.label=5;case 5:u=t.$ancestorComponent$;c=function(){return ce(e,t,a,true)};if(u&&u["s-rc"]){u["s-rc"].push(c)}else{c()}return[2]}}))}))};var Ne=function(e,r){if(($.$flags$&1)===0){var n=H("connectedCallback",r.$tagName$);var t=p(e);if(r.$listeners$){t.$rmListeners$=we(e,t,r.$listeners$)}if(!(t.$flags$&1)){t.$flags$|=1;{var a=e;while(a=a.parentNode||a.host){if(a["s-p"]){ue(t,t.$ancestorComponent$=a);break}}}if(r.$members$){Object.entries(r.$members$).forEach((function(r){var n=r[0],t=r[1][0];if(t&31&&e.hasOwnProperty(n)){var a=e[n];delete e[n];e[n]=a}}))}{A((function(){return je(e,t,r)}))}}n()}};var Ce=function(e){if(($.$flags$&1)===0){var r=p(e);{if(r.$rmListeners$){r.$rmListeners$();r.$rmListeners$=undefined}}if($.$cssShim$){$.$cssShim$.removeHost(e)}}};var Pe=e("b",(function(e,r){if(r===void 0){r={}}var n=H();var t=[];var a=r.exclude||[];var i=f.customElements;var s=c.head;var o=s.querySelector("meta[charset]");var l=c.createElement("style");var u=[];var h;var d=true;Object.assign($,r);$.$resourcesUrl$=new URL(r.resourcesUrl||"./",c.baseURI).href;if(r.syncQueue){$.$flags$|=4}e.forEach((function(e){return e[1].forEach((function(r){var n={$flags$:r[0],$tagName$:r[1],$members$:r[2],$listeners$:r[3]};{n.$members$=r[2]}{n.$listeners$=r[3]}{n.$watchers$={}}if(!v&&n.$flags$&1){n.$flags$|=8}var s=n.$tagName$;var o=function(e){__extends(r,e);function r(r){var t=e.call(this,r)||this;r=t;y(r);if(n.$flags$&1){if(v){{r.attachShadow({mode:"open"})}}else if(!("shadowRoot"in r)){r.shadowRoot=r}}return t}r.prototype.connectedCallback=function(){var e=this;if(h){clearTimeout(h);h=null}if(d){u.push(this)}else{$.jmp((function(){return Ne(e,n)}))}};r.prototype.disconnectedCallback=function(){var e=this;$.jmp((function(){return Ce(e)}))};r.prototype.forceUpdate=function(){de(this,n)};r.prototype.componentOnReady=function(){return p(this).$onReadyPromise$};return r}(HTMLElement);n.$lazyBundleIds$=e[0];if(!a.includes(s)&&!i.get(s)){t.push(s);i.define(s,xe(o,n,1))}}))}));{l.innerHTML=t+z;l.setAttribute("data-styles","");s.insertBefore(l,o?o.nextSibling:s.firstChild)}d=false;if(u.length>0){u.forEach((function(e){return e.connectedCallback()}))}else{{$.jmp((function(){return h=setTimeout(me,30)}))}}n()}));var Ae=e("c",(function(e,r,n){var t=Oe(e);return{emit:function(e){var a=new CustomEvent(r,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:e});t.dispatchEvent(a);return a}}}));var Oe=e("g",(function(e){return p(e).$hostElement$}))}}}));