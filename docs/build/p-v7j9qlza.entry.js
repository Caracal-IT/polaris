import{r as t,h as s,H as i,c as e,g as r}from"./p-6eb4fc33.js";const n=class{constructor(s){t(this,s)}async analyticsHandler(t){const s=n.analyticsService.getPath(t);n.lastPath[0]!==s[0]&&(n.lastPath=s,s.find(t=>void 0!==t["wf-Workflow"])&&(s[0].addEventListener("blur",this.onBlur),n.analyticsService.send("click",s)))}wfMessage(t){n.analyticsService.sendMessage(t)}onBlur(t){n.analyticsService.send("blur",n.lastPath),t.target.removeEventListener("blur",this.onBlur)}};n.lastPath=[null],n.analyticsService=new class{sendMessage(t){this.sendPostMessage(t.detail)}send(t,s){const i=s.find(t=>void 0!==t["wf-Workflow"]);if(!i)return;const e=this.createPayload(t,i,s);e&&this.sendPostMessage({type:e.type,process:e.process,activity:e.activity,control:e.control,valueHash:e.valueHash,path:e.wfPath.map(this.getName)})}getPath(t){return t.composedPath(t)}sendPostMessage(t){const s=Object.assign(Object.assign({},t),{timestamp:Date.now()});console.log("ANALYTICS",s),window.postMessage(s,"*")}getName(t){return t.id?t.id:t.page&&t.page.name?t.page.name:""}createPayload(t,s,i){const e=i.filter(t=>t.nodeName&&-1===t.nodeName.indexOf("document-fragment")),r=e.find(t=>"polaris-workflow"===t.localName);if(!r)return null;const n=r.ctx.wf.activity,h=e.slice(0,e.indexOf(r)+1);return n.name?{type:t,process:r.ctx.wf.process.name,activity:n.name,control:s.id,valueHash:this.getHashCode(s.value),wfPath:h}:null}getHashCode(t){let s,i=0;if(!t||0===t.length)return i;for(let e=0;e<t.length;e++)s=t.charCodeAt(e),i=(i<<5)-i+s,i|=0;return i}};const h=class{constructor(s){t(this,s)}render(){return s(i,null,s("polaris-header",null),s("div",null,s("polaris-menu",null),s("polaris-main",null)))}static get style(){return"*{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-direction:column;flex-direction:column;height:100vh;-ms-flex-align:stretch;align-items:stretch}:host,div{display:-ms-flexbox;display:flex}div{height:100%}polaris-header{-ms-flex:0 0 50px;flex:0 0 50px}polaris-menu{-ms-flex:0 0 150px;flex:0 0 150px}polaris-main{-ms-flex:1;flex:1}"}},o=class{constructor(s){t(this,s)}render(){return s("header",null,s("h1",null,"Polaris Workflow"))}static get style(){return"h1{color:purple}"}},c=class{constructor(s){t(this,s)}locationChangeHandler(){this.setProcess()}componentWillLoad(){this.setProcess()}render(){return s("polaris-workflow",{process:this.process,activity:this.activity,sessionId:this.sessionId})}setProcess(){const t=window.location.hash.replace("#","").split("-");this.process!==t[0]&&(this.activity=t.length>1?t[1]:"start",this.sessionId=t.length>2?t[2]:null,this.process=t[0],window.location.hash=this.process)}static get style(){return":host{margin:10px;max-width:600px}h1{color:purple}.text{margin:5px;color:#757575}.error{color:red}.success{color:#006400;font-weight:bolder}input{font-size:1rem;padding:.8rem .8rem .8rem .4rem;margin:5px 1px;display:block;width:100%;border-radius:10px;border:1px solid var(--primary-border-color,#757575)}input:focus{outline:none;margin:4px 0;border:2px solid var(--primary-border-color,purple)}input[error=true]{margin:4px 0;background-color:#ffb6c1;border:2px solid red}[wf-error]{color:red;font-weight:bolder}"}},a=class{constructor(s){t(this,s)}locationChangeHandler(){this.setActiveMenuItem()}componentWillLoad(){this.setActiveMenuItem()}render(){return s(i,null,s("nav",null,s("a",{href:"#registration",class:"registration"===this.process?"active":""},"Registration")),s("nav",null,s("a",{href:"#deposit",class:"deposit"===this.process?"active":""},"Deposit")))}setActiveMenuItem(){const t=window.location.hash.replace("#","").split("-");this.process=t[0],this.process||(window.location.hash="registration")}static get style(){return":host{border-right:1px solid #757575}a{display:block;line-height:2;padding:0 5px;width:calc(100% - 20px);border-radius:10px}a:link,a:visited{margin:0 5px;cursor:pointer;color:#757575;text-decoration:none}a:active,a:hover{margin:0 5px;cursor:pointer;color:purple;text-decoration:underline}a.active{color:purple;background-color:#eeb1ee}"}};class l{constructor(t){this.ctx=t}async fetch(t){return(await fetch(this.resolveSetting(t.url),this.getConfig(t))).json()}getConfig(t){return{method:t.method,mode:"cors",headers:Object.apply({"Content-Type":"application/json"},t.headers),redirect:"follow",referrer:"no-referrer",body:t.body?JSON.stringify(t.body):null}}resolveSetting(t){const s=t.match(/\[[\w|_]+\]/g);return s?s.reduce((t,s)=>t.replace(s,this.ctx.config.getSetting(s)),t):t}}function u(t,[s,i]){return new Intl.NumberFormat(s,{style:"currency",currency:i}).format(+t)}class d{constructor(){this.currencyFormat=u}}class p{constructor(){this.model={},this.sessionId=this.UUID(),this.pipes=new d}getValue(t,s=this.model){const i=t.split(".").reduce((t,s)=>t?t[s]:void 0,Object.assign({},s));return t.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g)||void 0!==i?i:t}getInterpolatedValue(t){if(!t)return t;const s=t.match(/\{\{(?:(\w|\.|\||-)+)\}\}/g);return s&&0!==s.length?s.reduce((t,s)=>this.replaceAll(t,s),t):t}setValue(t,s){this.model=this.merge(this.model,t,s)}save(){sessionStorage.setItem(this.sessionId,JSON.stringify(this.model))}load(){const t=sessionStorage.getItem(this.sessionId);this.clearCache(),t&&(this.model=JSON.parse(t))}clearCache(){sessionStorage.clear()}merge(t,s,i){if(!s)return;let e=Object.assign({},t);return s.split(".").reduce((t,s,e,r)=>(t[s]=e==r.length-1?i:Object.assign({},t[s]),t[s]),e),e}UUID(){return"xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx".replace(/[xy]/g,(function(t){var s=16*Math.random()|0;return("x"==t?s:3&s|8).toString(16)}))}replaceAll(t,s){const i=s.substring(2,s.length-2).split("|"),e=i.slice(2);let r=this.getValue(i[0]);return i&&i.length>1&&this.pipes[i[1]]&&(r=this.pipes[i[1]](r,e)),t.replace(s,r)}}class f{constructor(){this.settings={"[WF]":"wf"}}getSetting(t){return this.settings[t]}}class y{constructor(){this.name="code",this.type="code-activity"}async execute(){return!(!this.ctx||!this.ctx.model||(this.eval(this.expression,this.ctx),this.next&&this.next.length>0&&this.ctx.wf.goto(this.next),0))}eval(t,s){return new Function("ctx","model",t)(s,s.model)}}class v{constructor(){this.name="undefined",this.type="null-activity"}execute(){return new Promise((t,s)=>s())}}class w{static create(t,s){if(!t||!t.type)return new v;let i=w.activities.find(s=>s.type===t.type);return i?Object.assign(i,t,{ctx:s}):new v}}w.activities=[new v,new class{constructor(){this.name="start",this.type="page-activity"}async execute(){return this.ctx&&this.ctx.page&&this.ctx.page.controls&&(this.ctx.page.controls=this.controls||[]),!0}},new class{constructor(){this.name="start",this.type="api-activity"}async execute(){return this.endpoints&&this.endpoints.length>0?this.callEndpoints():this.next&&this.ctx&&this.gotoNext(),!0}callEndpoints(){if(!this.ctx||!this.ctx.http||!this.endpoints)return;let t=0;const s=this.callEndpoint.bind(this,this.ctx.http);this.endpoints.forEach(i=>{t++,i.body=this.getBody(i),s(i).finally(()=>{t--,0===t&&this.gotoNext()})})}async callEndpoint(t,s){if(this.ctx&&this.ctx.config)return t.fetch(s).then(t=>this.setModel(s,t))}gotoNext(){this.next&&this.ctx&&this.ctx.wf.goto(this.next)}getBody(t){if(!this.ctx||!this.ctx.model||"GET"===t.method.toUpperCase()||"DELETE"===t.method.toUpperCase())return null;const s=this.ctx.model;let i={};return t.mappings.filter(t=>"out"===t.direction||"inout"===t.direction).forEach(t=>Object.assign(i,{[t.client]:s.getValue(t.client)})),JSON.stringify(i)}setModel(t,s){if(!this.ctx||!this.ctx.model)return;const i=this.ctx.model,e=t.mappings;if(!e||0===e.length)return Object.keys(s).forEach(t=>i.setValue(t,s[t]));e.filter(t=>"in"===t.direction||"inout"===t.direction).forEach(t=>i.setValue(t.client,i.getValue(t.remote,s)))}},new class{constructor(){this.name="assign",this.type="assign-activity"}async execute(){if(!this.ctx||!this.ctx.model)return!1;let t=this.value||"";return this.value&&this.value.startsWith("{")&&this.value.endsWith("}")&&(t=this.ctx.model.getValue(this.value.substring(1,this.value.length-1))),this.ctx.model.setValue(this.key,t),this.ctx.wf.goto(this.next),!0}},new y,new class extends y{constructor(){super(...arguments),this.name="assign",this.type="decision-activity"}async execute(){if(!this.ctx||!this.ctx.model||!this.conditions)return!1;let t=!0;for(let s of this.conditions)t="or"===s.operator?t||this.validate(s):t&&this.validate(s);return this.ctx.wf.goto(t?this.trueAction:this.falseAction),!0}validate(t){try{let s=t.left;return t.left&&t.left.startsWith("{")&&t.left.endsWith("}")&&(s=this.ctx.model.getValue(t.left.substring(1,t.left.length-1))),super.eval(`return ${s} ${t.equality} ${t.right};`,this.ctx)}catch(s){return console.warn("Decision Activity",s),!1}}},new class{constructor(){this.name="ipc",this.type="ipc-activity"}async execute(){var t;return!(!this.ctx||!this.ctx.wf||(this.process&&this.process.length>0&&(this.ctx.wf.stack.push({process:null===(t=this.ctx.wf.process)||void 0===t?void 0:t.name,activity:this.next}),this.ctx.wf.setProcess(this.process)),0))}},new class{constructor(){this.name="finish",this.type="finish-activity"}async execute(){if(!this.ctx||!this.ctx.wf)return!1;if(0===this.ctx.wf.stack.length)return!0;const t=this.ctx.wf.stack.pop();return this.ctx.wf.setProcess(t.process,t.activity),!0}},new class{constructor(){this.name="redirect",this.type="redirect-activity"}async execute(){var t;if(!this.ctx||!this.ctx.wf)return!1;this.ctx.model.save();const s=`${null===(t=this.ctx.wf.process)||void 0===t?void 0:t.name}-${this.next}-${this.ctx.model.sessionId}`;return window.location.href=`${this.location}?returnUrl=${s}`,!0}}];class g{constructor(t){this.ctx=t,this.stack=[]}async setProcess(t,s="start"){try{"string"==typeof t&&(t=await this.ctx.http.fetch({url:`[WF]/${t}`,method:"get"})),this.process=t,this.activity=null,this.goto(s)}catch(i){i&&this.ctx.page.sendMessage({type:"ERROR",description:i.message,metadata:i})}}goto(t){setTimeout(this.tryNext.bind(this,t))}async tryNext(t){var s;try{this.ctx.page.sendMessage({type:"START_LOADING"}),this.ctx.page.sendMessage({type:"WORKFLOW_CHANGING"}),await this.next(t),this.ctx.page.sendMessage({type:"WORKFLOW_CHANGED"})}catch(i){this.ctx.page.sendMessage({type:"ERROR",description:null===(s=i)||void 0===s?void 0:s.message,metadata:i})}finally{this.ctx.page.sendMessage({type:"END_LOADING"})}}async next(t){var s;if(!this.process||!this.process.activities)return null;if("page-activity"===(null===(s=this.ctx.wf.activity)||void 0===s?void 0:s.type)&&!this.ctx.validator.validate())return null;let i=this.process.activities.find(s=>s.name==t);if(!i)throw new Error(`Activity ${t} not found`);return this.activity=i,await w.create(this.activity,this.ctx).execute()}}class x extends class{constructor(t){this.name=t}setError(t,s,i){t.error=s,t.errorMessage=s?i:null,t.el&&(t.el.setAttribute("error",t.error?"true":"false"),t.el.setAttribute("errorMessage",t.errorMessage)),t.el.nextSibling.attributes["wf-error"]&&(t.el.nextSibling.textContent=t.errorMessage)}}{validate(t,s,i){const e=t.model.getValue(s.id),r=null==e||0===e.length;return super.setError(s,r,i.message),!r}}class m{constructor(t){this.ctx=t,this.validators=[new x("Required")]}validate(){if(!this.ctx.page||!this.ctx.page.controls)return!0;let t=!0;for(const s of this.ctx.page.controls)t=this.validateControl(s)&&t;return t}validateControl(t){if(!t)return!0;let s=!0;for(const i in t.controls)s=this.validateControl(t.controls[i])&&s;if(t.validators&&t.validators.length>0)for(const i of t.validators){const e=this.validators.find(t=>t.name===i.name);e&&(e.validate(this.ctx,t,i)||(s=!1,this.sendErrorMsg(e,t)))}return s}sendErrorMsg(t,s){this.ctx.page.sendMessage({type:"VALIDATION_ERROR",description:s.errorMessage,metadata:{validator:t.name,control:s.id}})}}const E=class{constructor(s){t(this,s),this.page=this,this.model=new p,this.http=new l(this),this.config=new f,this.wf=new g(this),this.validator=new m(this),this._components=[],this.ctx=this,this.wfMessage=e(this,"wfMessage",7)}processChangeHandler(){this.load(this.process,this.activity,this.sessionId)}get controls(){return this._components}set controls(t){this._components=t,this._render()}async load(t,s="start",i=""){i&&i.length>0&&(this.ctx.model.sessionId=i,this.ctx.model.load()),await this.wf.setProcess(t,s)}sendMessage(t){var s,i,e;const r={process:null===(s=this.wf.process)||void 0===s?void 0:s.name,activity:null===(i=this.wf.activity)||void 0===i?void 0:i.name,activityType:null===(e=this.wf.activity)||void 0===e?void 0:e.type,timestamp:Date.now()},n=Object.assign(Object.assign({},t),r);this.wfMessage.emit(n)}componentWillLoad(){this.process&&this.load(this.process,this.activity,this.sessionId)}_render(){for(let t=this.el.childNodes.length-1;t>=0;t--)this.el.removeChild(this.el.childNodes[t]);this.controls.forEach(this.renderComponent.bind(this,this.el))}renderComponent(t,s){var i;const e=document.createElement(s.tag),r=Object.assign(e,s,{"wf-Workflow":"",ctx:this});s.el=r,this.bind(r),this.bindCaption(r,s),null===(i=s.controls)||void 0===i||i.forEach(this.renderComponent.bind(this,r)),t.appendChild(r),this.addErrorLabel(r)}bind(t){if(!t.id||void 0===t.value)return;const s=this.model.getValue(t.id);void 0!==s&&(t.value=s),this.model.setValue(t.id,t.value),t.oninput=this.onInput.bind(this,t)}bindCaption(t,s){this.interpolate("caption",t,s),this.interpolate("textContent",t,s),this.interpolate("innerHTML",t,s)}interpolate(t,s,i){s[t]&&(s[t]=this.model.getInterpolatedValue(i[t]||s[t]))}onInput(t){this.model.setValue(t.id,t.value),t.hasAttribute("error")&&this.validator.validate()}addErrorLabel(t){if(!t.validators)return;const s=document.createElement("span");s.setAttribute("wf-error","error"),t.parentNode.appendChild(s)}get el(){return r(this)}static get watchers(){return{process:["processChangeHandler"]}}};export{n as polaris_analytics,h as polaris_app,o as polaris_header,c as polaris_main,a as polaris_menu,E as polaris_workflow};