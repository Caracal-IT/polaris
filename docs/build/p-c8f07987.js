let t=0,e=!1;const n="undefined"!=typeof window?window:{},s=n.CSS,o=n.document||{head:{}},r={t:0,s:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s)},c=t=>Promise.resolve(t),a=(t,e,n)=>{n&&n.map(([n,s,o])=>{const c=l(t,n),a=i(e,o),m=p(n);r.ael(c,s,a,m),(e.o=e.o||[]).push(()=>r.rel(c,s,a,m))})},i=(t,e)=>n=>{256&t.t?t.l[e](n):(t.p=t.p||[]).push([e,n])},l=(t,e)=>4&e?o:t,p=t=>0!=(2&t),m=t=>U(t).u,u=(t,e,n)=>{const s=m(t);return{emit:t=>f(s,e,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:t})}},f=(t,e,n)=>{const s=new CustomEvent(e,n);return t.dispatchEvent(s),s},d=(t,e)=>{e&&!t.h&&e["s-p"]&&e["s-p"].push(new Promise(e=>t.h=e))},h=(t,e)=>{if(t.t|=16,!(4&t.t))return d(t,t.$),B(()=>w(t,e));t.t|=512},w=(t,e)=>{const n=t.l;let s;return e&&(t.t|=256,t.p&&(t.p.map(([t,e])=>_(n,t,e)),t.p=null),s=_(n,"componentWillLoad")),j(s,()=>b(t))},b=t=>{const e=t.u,n=e["s-rc"];t.t&=-17,t.t|=2,n&&(n.map(t=>t()),e["s-rc"]=void 0);{const n=e["s-p"],s=()=>$(t);0===n.length?s():(Promise.all(n).then(s),t.t|=4,n.length=0)}},$=t=>{const e=t.u,n=t.$;64&t.t||(t.t|=64,v(e),t._(e),n||y()),t.j(e),t.h&&(t.h(),t.h=void 0),512&t.t&&q(()=>h(t,!1)),t.t&=-517},y=()=>{v(o.documentElement),r.t|=2,q(()=>f(n,"appload",{detail:{namespace:"polaris"}}))},_=(t,e,n)=>{if(t&&t[e])try{return t[e](n)}catch(s){R(s)}},j=(t,e)=>t&&t.then?t.then(e):e(),v=t=>t.classList.add("hydrated"),M=(t,e,n)=>{if(e.v){t.watchers&&(e.M=t.watchers);const s=Object.entries(e.v),o=t.prototype;if(s.map(([t,[s]])=>{31&s||2&n&&32&s?Object.defineProperty(o,t,{get(){return((t,e)=>U(this).g.get(e))(0,t)},set(n){((t,e,n,s)=>{const o=U(this),r=o.g.get(e),c=o.t,a=o.l;if(n=((t,e)=>null==t||(t=>"object"==(t=typeof t)||"function"===t)(t)?t:1&e?t+"":t)(n,s.v[e][0]),!(8&c&&void 0!==r||n===r)&&(o.g.set(e,n),a)){if(s.M&&128&c){const t=s.M[e];t&&t.map(t=>{try{a[t](n,r,e)}catch(s){R(s)}})}2==(18&c)&&h(o,!1)}})(0,t,n,e)},configurable:!0,enumerable:!0}):1&n&&64&s&&Object.defineProperty(o,t,{value(...e){const n=U(this);return n.L.then(()=>n.l[t](...e))}})}),1&n){const e=new Map;o.attributeChangedCallback=function(t,n,s){r.jmp(()=>{const n=e.get(t);this[n]=(null!==s||"boolean"!=typeof this[n])&&s})},t.observedAttributes=s.filter(([t,e])=>15&e[0]).map(([t,n])=>{const s=n[1]||t;return e.set(s,t),s})}}return t},g=(t,e={})=>{const s=[],c=e.exclude||[],i=n.customElements,l=o.head,p=l.querySelector("meta[charset]"),m=o.createElement("style"),u=[];let f,w=!0;Object.assign(r,e),r.s=new URL(e.resourcesUrl||"./",o.baseURI).href,e.syncQueue&&(r.t|=4),t.map(t=>t[1].map(e=>{const n={t:e[0],U:e[1],v:e[2],O:e[3]};n.v=e[2],n.O=e[3],n.M={};const o=n.U,l=class extends HTMLElement{constructor(t){super(t),P(t=this,n)}connectedCallback(){f&&(clearTimeout(f),f=null),w?u.push(this):r.jmp(()=>(t=>{if(0==(1&r.t)){const e=U(t),n=e.P,s=()=>{};if(1&e.t)a(t,e,n.O);else{e.t|=1;{let n=t;for(;n=n.parentNode||n.host;)if(n["s-p"]){d(e,e.$=n);break}}n.v&&Object.entries(n.v).map(([e,[n]])=>{if(31&n&&t.hasOwnProperty(e)){const n=t[e];delete t[e],t[e]=n}}),q(()=>(async(t,e,n,s,o)=>{if(0==(32&e.t)){e.t|=32;{if((o=C(n)).then){const t=()=>{};o=await o,t()}o.isProxied||(n.M=o.watchers,M(o,n,2),o.isProxied=!0);const t=()=>{};e.t|=8;try{new o(e)}catch(a){R(a)}e.t&=-9,e.t|=128,t()}}const r=e.$,c=()=>h(e,!0);r&&r["s-rc"]?r["s-rc"].push(c):c()})(0,e,n))}s()}})(this))}disconnectedCallback(){r.jmp(()=>(()=>{if(0==(1&r.t)){const t=U(this);t.o&&(t.o.map(t=>t()),t.o=void 0)}})())}forceUpdate(){(()=>{{const t=U(this);t.u.isConnected&&2==(18&t.t)&&h(t,!1)}})()}componentOnReady(){return U(this).R}};n.k=t[0],c.includes(o)||i.get(o)||(s.push(o),i.define(o,M(l,n,1)))})),m.innerHTML=s+"{visibility:hidden}.hydrated{visibility:inherit}",m.setAttribute("data-styles",""),l.insertBefore(m,p?p.nextSibling:l.firstChild),w=!1,u.length?u.map(t=>t.connectedCallback()):r.jmp(()=>f=setTimeout(y,30))},L=new WeakMap,U=t=>L.get(t),O=(t,e)=>L.set(e.l=t,e),P=(t,e)=>{const n={t:0,u:t,P:e,g:new Map};return n.L=new Promise(t=>n.j=t),n.R=new Promise(t=>n._=t),t["s-p"]=[],t["s-rc"]=[],a(t,n,e.O),L.set(t,n)},R=t=>console.error(t),k=new Map,C=t=>{const e=t.U.replace(/-/g,"_"),n=t.k,s=k.get(n);return s?s[e]:__sc_import_polaris(`./${n}.entry.js`).then(t=>(k.set(n,t),t[e]),R)},E=[],T=[],x=[],A=(t,n)=>s=>{t.push(s),e||(e=!0,n&&4&r.t?q(W):r.raf(W))},F=(t,e)=>{let n=0,s=0;for(;n<t.length&&(s=performance.now())<e;)try{t[n++](s)}catch(o){R(o)}n===t.length?t.length=0:0!==n&&t.splice(0,n)},W=()=>{t++,(t=>{for(let n=0;n<t.length;n++)try{t[n](performance.now())}catch(e){R(e)}t.length=0})(E);{const n=2==(6&r.t)?performance.now()+14*Math.ceil(.1*t):1/0;F(T,n),F(x,n),T.length>0&&(x.push(...T),T.length=0),(e=E.length+T.length+x.length>0)?r.raf(W):t=0}},q=t=>c().then(t),B=A(T,!0),H=()=>s&&s.supports&&s.supports("color","var(--c)")?c():__sc_import_polaris("./p-9f8c4bca.js").then(()=>(r.C=n.__cssshim)?(!1).i():0),N=()=>{r.C=n.__cssshim;const t=Array.from(o.querySelectorAll("script")).find(t=>/\/polaris(\.esm)?\.js($|\?|#)/.test(t.src)||"polaris"===t.getAttribute("data-stencil-namespace")),e=t["data-opts"]||{};return"onbeforeload"in t&&!history.scrollRestoration?{then(){}}:(e.resourcesUrl=new URL(".",new URL(t.getAttribute("data-resources-url")||t.src,n.location.href)).href,V(e.resourcesUrl,t),n.customElements?c(e):__sc_import_polaris("./p-2b669725.js").then(()=>e))},V=(t,e)=>{try{n.__sc_import_polaris=Function("w","return import(w);//"+Math.random())}catch(s){const r=new Map;n.__sc_import_polaris=s=>{const c=new URL(s,t).href;let a=r.get(c);if(!a){const t=o.createElement("script");t.type="module",t.crossOrigin=e.crossOrigin,t.src=URL.createObjectURL(new Blob([`import * as m from '${c}'; window.__sc_import_polaris.m = m;`],{type:"application/javascript"})),a=new Promise(e=>{t.onload=()=>{e(n.__sc_import_polaris.m),t.remove()}}),r.set(c,a),o.head.appendChild(t)}return a}}};export{H as a,g as b,u as c,m as g,N as p,O as r}