if(!self.define){let e,a={};const o=(o,i)=>(o=new URL(o+".js",i).href,a[o]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=a,document.head.appendChild(e)}else e=o,importScripts(o),a()})).then((()=>{let e=a[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(i,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(a[s])return;let r={};const c=e=>o(e,s),l={module:{uri:s},exports:r,require:c};a[s]=Promise.all(i.map((e=>l[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-6da860f9"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"build/index.esm.js",revision:"906b592219bde198f2eed7834ec49d44"},{url:"build/p-21d88fe9.js",revision:null},{url:"build/p-e24a44e0.entry.js",revision:null},{url:"example/activities/custom.activity.js",revision:"e7e143bfb691847961bb0ba6dcff49c1"},{url:"example/components/moon-button.component.js",revision:"2d1ae01d49189c8c69169fe0afdf6fd5"},{url:"example/components/moon-header.component.js",revision:"d03e4d1e092ee8843d8b77fa1ef60c76"},{url:"example/components/moon-label.component.js",revision:"6664ca2c99feb711dfcd199988e7021a"},{url:"example/components/moon-panel.component.js",revision:"91f74d42f101e4d06f999ca1c31b9512"},{url:"example/components/polaris-loader.component.js",revision:"4f8de1b7a087b1aa48ba70b3d26efc1a"},{url:"example/components/polaris-main.component.js",revision:"8cc0f3bfe47e84c99c9be01c3207b82f"},{url:"example/components/polaris-menu.component.js",revision:"4a28066a1a6b7255d004ee2462742034"},{url:"example/data/menu.json",revision:"d3a58881f9fb79ebe504363ef8cf2772"},{url:"example/data/settings.json",revision:"3b51472a5192123110594f98a2e5e100"},{url:"example/data/user.json",revision:"013120e8cac780a403fadb4fa1f90142"},{url:"example/demo-bank.html",revision:"c44eda8bc4d262a53ea9cea71788b23c"},{url:"example/favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"example/index.html",revision:"9564c326a84ca5dc6903cc437a396a1e"},{url:"example/style.css",revision:"cbfb4b8039e48262ddb0da656018cf2b"},{url:"example/validators/not13.validator.js",revision:"ae090b7c0d9d3066400815b8522d4537"},{url:"example/validators/validator.js",revision:"0a5ac9656cbe94821d41b559a8fea58b"},{url:"example/wf/default.wf.json",revision:"eb873ff8ef4c4c316836b7ed666a7569"},{url:"example/wf/deposit.wf.json",revision:"c65babbf10f79ac4ce0a645376798e16"},{url:"example/wf/home.wf.json",revision:"fc9d5aca23a9c42e8409b5dc08f8f32a"},{url:"example/wf/login.wf.json",revision:"4e4cf49899610b6537c5f5a18b23bb25"},{url:"example/wf/registration.wf.json",revision:"dd7bd82b7081120a82ec66d80760a433"},{url:"example/wf/router.wf.json",revision:"92942a64ade717ec251c65afdc9fc8b4"},{url:"favicon.ico",revision:"2c49ddd4d8914ddb330f07ba8a6a285b"},{url:"index.html",revision:"64baa2fff900e7b82e7a219017fe0229"},{url:"Polaris Workflow Design.png",revision:"f1f351ef8519508954fe8fe3fac731e7"},{url:"style.css",revision:"9ffa3bbaa36c493e61cfc4a0efe9bc22"}],{})}));
//# sourceMappingURL=sw.js.map
