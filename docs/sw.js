if(!self.define){let e,o={};const a=(a,n)=>(a=new URL(a+".js",n).href,o[a]||new Promise((o=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=o,document.head.appendChild(e)}else e=a,importScripts(a),o()})).then((()=>{let e=o[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(o[s])return;let r={};const c=e=>a(e,s),d={module:{uri:s},exports:r,require:c};o[s]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-7d6a3f4d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"build/index.esm.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"build/p-a838530e.entry.js",revision:null},{url:"build/p-fa26f64f.js",revision:null},{url:"example/activities/custom.activity.js",revision:"e7e143bfb691847961bb0ba6dcff49c1"},{url:"example/components/moon-button.component.js",revision:"2d1ae01d49189c8c69169fe0afdf6fd5"},{url:"example/components/moon-header.component.js",revision:"d03e4d1e092ee8843d8b77fa1ef60c76"},{url:"example/components/moon-label.component.js",revision:"9b6433ac9c806f2db6edfe3470819eb7"},{url:"example/components/moon-panel.component.js",revision:"91f74d42f101e4d06f999ca1c31b9512"},{url:"example/components/polaris-loader.component.js",revision:"4f8de1b7a087b1aa48ba70b3d26efc1a"},{url:"example/components/polaris-main.component.js",revision:"8cc0f3bfe47e84c99c9be01c3207b82f"},{url:"example/components/polaris-menu.component.js",revision:"4a28066a1a6b7255d004ee2462742034"},{url:"example/data/menu.json",revision:"d3a58881f9fb79ebe504363ef8cf2772"},{url:"example/data/settings.json",revision:"3b51472a5192123110594f98a2e5e100"},{url:"example/data/user.json",revision:"013120e8cac780a403fadb4fa1f90142"},{url:"example/demo-bank.html",revision:"c44eda8bc4d262a53ea9cea71788b23c"},{url:"example/favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"example/index.html",revision:"9e8dad953204def2171e9f8e56e615d2"},{url:"example/style.css",revision:"548de00623550812e61abc724f4aa251"},{url:"example/validators/not13.validator.js",revision:"ae090b7c0d9d3066400815b8522d4537"},{url:"example/validators/validator.js",revision:"daf466f8f35f7ec0ff8acda6915112ae"},{url:"example/wf/default.wf.json",revision:"eb873ff8ef4c4c316836b7ed666a7569"},{url:"example/wf/deposit.wf.json",revision:"d1763264a89170207032ccfb1b9475ab"},{url:"example/wf/home.wf.json",revision:"fc9d5aca23a9c42e8409b5dc08f8f32a"},{url:"example/wf/login.wf.json",revision:"f91cf97b7941b6c6bd5cb89659c23fe1"},{url:"example/wf/registration.wf.json",revision:"7190dcb6c0c635612688c9d426c0888d"},{url:"example/wf/router.wf.json",revision:"92942a64ade717ec251c65afdc9fc8b4"},{url:"favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"index.html",revision:"41fb15817082b0adc66ddfa78e0ab26f"},{url:"style.css",revision:"e25abe0b5cfee4199799120a42a698ca"}],{})}));
//# sourceMappingURL=sw.js.map
