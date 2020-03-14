import{r as t,c as s,g as i}from"./p-d0363cd7.js";const e=class{constructor(s){t(this,s)}async analyticsHandler(t){const s=e.analyticsService.getPath(t);e.lastPath[0]!==s[0]&&(e.lastPath=s,s.find(t=>void 0!==t["wf-Workflow"])&&(s[0].addEventListener("blur",this.onBlur),e.analyticsService.send("click",s)))}wfMessage(t){e.analyticsService.sendMessage(t)}onBlur(t){e.analyticsService.send("blur",e.lastPath),t.target.removeEventListener("blur",this.onBlur)}};e.lastPath=[null],e.analyticsService=new class{sendMessage(t){this.sendPostMessage(t.detail)}send(t,s){const i=s.find(t=>void 0!==t["wf-Workflow"]);if(!i)return;const e=this.createPayload(t,i,s);e&&this.sendPostMessage({type:e.type,process:e.process,activity:e.activity,control:e.control,valueHash:e.valueHash,path:e.wfPath.map(this.getName)})}getPath(t){return t.composedPath(t)}sendPostMessage(t){const s=Object.assign(Object.assign({},t),{timestamp:Date.now()});console.log("ANALYTICS",s),window.postMessage(s,"*")}getName(t){return t.id?t.id:t.page&&t.page.name?t.page.name:""}createPayload(t,s,i){const e=i.filter(t=>t.nodeName&&-1===t.nodeName.indexOf("document-fragment")),r=e.find(t=>"polaris-workflow"===t.localName);if(!r)return null;const n=r.ctx.wf.activity,h=e.slice(0,e.indexOf(r)+1);return n.name?{type:t,process:r.ctx.wf.process.name,activity:n.name,control:s.id,valueHash:this.getHashCode(s.value),wfPath:h}:null}getHashCode(t){let s,i=0;if(!t||0===t.length)return i;for(let e=0;e<t.length;e++)s=t.charCodeAt(e),i=(i<<5)-i+s,i|=0;return i}};class r{constructor(t){this.ctx=t}async fetch(t){try{this.ctx.page.sendMessage({type:"START_LOADING"});const s=await fetch(this.resolveSetting(t.url),this.getConfig(t));if(s.status>=400){const i=await s.json();throw s.status>=401&&this.ctx.page.sendMessage({type:"UN_AUTHORIZED",metadata:{endpoint:t,error:i}}),{code:s.status,message:s.statusText,error:i}}return await s.json()}finally{setTimeout(()=>this.ctx.page.sendMessage({type:"END_LOADING"}))}}getConfig(t){return{method:t.method,mode:"cors",headers:Object.apply({"Content-Type":"application/json"},t.headers),redirect:"follow",referrer:"no-referrer",body:t.body?JSON.stringify(t.body):null}}resolveSetting(t){const s=t.match(/\[[\w|_]+\]/g);return s?s.reduce(this.replace.bind(this),t):t}replace(t,s){let i=this.ctx.config.getSetting(s);return i&&i.indexOf("[SELF]")>-1?i.replace("[SELF]",t.replace(s,"")):t.replace(s,i)}}function n(t,[s,i]){return new Intl.NumberFormat(s,{style:"currency",currency:i}).format(+t)}class h{constructor(){this.currencyFormat=n}}class c{constructor(t){this.config=t,this.model={},this.sessionId=this.UUID(),this.pipes=new h}getValue(t,s=this.model){if(0===t.indexOf("[")||t.indexOf("]")===t.length-1)return this.config.getSetting(t);const i=t.split(".").reduce((t,s)=>t?t[s]:void 0,Object.assign({},s));return t.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g)||void 0!==i?i:t}getInterpolatedValue(t){if(!t)return t;const s=t.match(/\{\{\[*(?:(\w|\.|\||-)+)\]*\}\}/g);return s&&0!==s.length?s.reduce((t,s)=>this.replaceAll(t,s),t):t}setValue(t,s){0===t.indexOf("[")||t.indexOf("]")===t.length-1?this.config.addSetting(t,s):this.model=this.merge(this.model,t,s)}save(){sessionStorage.setItem(this.sessionId,JSON.stringify(this.model))}load(){const t=sessionStorage.getItem(this.sessionId);this.clearCache(),t&&(this.model=JSON.parse(t))}clearCache(){sessionStorage.clear()}merge(t,s,i){if(!s)return;let e=Object.assign({},t);return s.split(".").reduce((t,s,e,r)=>(t[s]=e==r.length-1?i:Object.assign({},t[s]),t[s]),e),e}UUID(){return"xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx".replace(/[xy]/g,(function(t){var s=16*Math.random()|0;return("x"==t?s:3&s|8).toString(16)}))}replaceAll(t,s){const i=s.substring(2,s.length-2).split("|"),e=i.slice(2);let r=this.getValue(i[0]);return i&&i.length>1&&this.pipes[i[1]]&&(r=this.pipes[i[1]](r,e)),t.replace(s,r)}}class o{constructor(){this.settings={}}getSetting(t){return this.settings[t]}addSetting(t,s){-1===t.indexOf("[")&&(t=`[${t}]`),this.settings[t]=s}}class a{constructor(){this.name="code",this.type="code-activity"}async execute(){return this.eval(this.expression,this.ctx),this.next&&this.next.length>0&&this.ctx.wf.goto(this.next),!0}eval(t,s){return new Function("ctx",t)(s)}}class l{constructor(){this.name="undefined",this.type="null-activity"}execute(){return new Promise((t,s)=>s("NULL Activity"))}}class u{static create(t,s){if(!t||!t.type)return new l;let i=u.activities.find(s=>s.type===t.type);return i?Object.assign(i,t,{ctx:s}):new l}static add(t){u.activities.find(s=>s.type===t.type)||u.activities.push(t)}}u.activities=[new l,new class{constructor(){this.name="start",this.type="page-activity"}async execute(){return this.ctx.page.controls&&(this.ctx.page.controls=this.controls||[]),!0}},new class{constructor(){this.name="start",this.type="api-activity"}async execute(){return await this.callEndpoints(),this.gotoNext(),!0}async callEndpoints(){for(const t of this.endpoints)t.body=this.getBody(t),await this.callEndpoint(this.ctx.http,t);return!0}async callEndpoint(t,s){return t.fetch(s).then(t=>this.setModel(s,t))}gotoNext(){this.next&&this.ctx&&this.ctx.wf.goto(this.next)}getBody(t){if(!this.ctx||!this.ctx.model||"GET"===t.method.toUpperCase()||"DELETE"===t.method.toUpperCase())return null;const s=this.ctx.model;let i={};return t.mappings.filter(t=>"out"===t.direction||"inout"===t.direction).forEach(t=>Object.assign(i,{[t.remote]:s.getValue(t.client)})),i}setModel(t,s){if(!this.ctx||!this.ctx.model)return;const i=this.ctx.model,e=t.mappings;if(!e||0===e.length)return Object.keys(s).forEach(t=>i.setValue(t,s[t]));e.filter(t=>"in"===t.direction||"inout"===t.direction).forEach(t=>i.setValue(t.client,i.getValue(t.remote,s)))}},new class{constructor(){this.name="assign",this.type="assign-activity"}async execute(){const t=this.ctx.model.getInterpolatedValue(this.value);return this.ctx.model.setValue(this.key,t),this.ctx.wf.goto(this.next),!0}},new a,new class extends a{constructor(){super(...arguments),this.name="decision",this.type="decision-activity"}async execute(){const t=`return ${this.ctx.model.getInterpolatedValue(this.expression)};`;return this.eval(t,this.ctx)?this.ctx.wf.goto(this.trueAction):this.ctx.wf.goto(this.falseAction),!0}},new class{constructor(){this.name="ipc",this.type="ipc-activity"}async execute(){return this.process&&this.process.length>0&&(this.ctx.wf.stack.push({process:this.ctx.wf.process.name,activity:this.next}),this.ctx.wf.setProcess(this.process,"start",!this.next)),!0}},new class{constructor(){this.name="finish",this.type="finish-activity"}async execute(){if(0===this.ctx.wf.stack.length)return this.next&&this.ctx.wf.goto(this.next),!0;const t=this.ctx.wf.stack.pop();return this.ctx.wf.setProcess(t.process,t.activity),!0}},new class{constructor(){this.name="redirect",this.type="redirect-activity"}async execute(){var t;this.ctx.model.save();const s=`${null===(t=this.ctx.wf.process)||void 0===t?void 0:t.name}-${this.next}-${this.ctx.model.sessionId}`;return window.location.href=`${this.location}?returnUrl=${s}`,!0}},new class extends a{constructor(){super(...arguments),this.name="switch",this.type="switch-activity"}async execute(){for(let t of this.rules||[]){const s=`return ${this.ctx.model.getInterpolatedValue(t.expression)};`;if(this.eval(s,this.ctx))return this.ctx.wf.goto(t.next),!0}throw new Error(`No valid rule in ${this.name} found !!`)}}];class d{constructor(t){this.ctx=t,this.stack=[]}async setProcess(t,s="start",i=!0){try{i&&(this.stack=[]),"string"==typeof t&&this.loader&&(t=await this.loader.load(t)),this.process=t,this.activity=null,this.goto(s),this.ctx.page.sendMessage({type:"PROCESS_CHANGED",metadata:{stack:this.stack}})}catch(e){e&&(console.error(e),this.ctx.page.sendMessage({type:"ERROR",description:e.message,metadata:e}))}}goto(t){setTimeout(this.tryNext.bind(this,t))}async tryNext(t){try{this.ctx.page.sendMessage({type:"WORKFLOW_CHANGING"}),await this.next(t),this.ctx.page.sendMessage({type:"WORKFLOW_CHANGED"})}catch(s){this.ctx.page.sendMessage({type:"ERROR",description:null==s?void 0:s.message,metadata:s})}}async next(t){var s;if(!this.process||!this.process.activities)return null;if("page-activity"===(null===(s=this.ctx.wf.activity)||void 0===s?void 0:s.type)&&!this.ctx.validator.validate(this.ctx))return null;let i=this.process.activities.find(s=>s.name==t);if(!i)throw new Error(`Activity ${t} not found`);return this.activity=i,await u.create(this.activity,this.ctx).execute()}}class y{constructor(t){this.name=t}setError(t,s,i){t.error=s,t.errorMessage=s?i:null,t.el&&(t.el.setAttribute("error",t.error?"true":"false"),t.el.setAttribute("errorMessage",t.errorMessage)),t.el.nextSibling.attributes["wf-error"]&&(t.el.nextSibling.textContent=t.errorMessage)}}class w extends y{validate(t,s,i){const e=t.model.getValue(s.id),r=null==e||0===e.length;return super.setError(s,r,i.message),!r}}class f extends y{validate(t,s,i){const e=t.model.getValue(s.id),r=!!new RegExp(i.expression,"g").exec(e);return super.setError(s,!r,i.message),r}}class p extends y{validate(t,s,i){const e=+t.model.getValue(s.id),r=e>=i.min&&e<=i.max;return super.setError(s,!r,i.message),r}}class x{constructor(){this.validators=[new w("required"),new f("regex"),new p("range")]}validate(t){if(!t.page||!t.page.controls)return!0;let s=!0;for(const i of t.page.controls)s=this.validateControl(t,i)&&s;return s}addValidator(t){this.validators.find(s=>s.name===t.name)||this.validators.push(t)}validateControl(t,s){if(!s)return!0;let i=!0;for(const e in s.controls)i=this.validateControl(t,s.controls[e])&&i;if(s.validators&&s.validators.length>0)for(const e of s.validators){const r=this.validators.find(t=>t.name===e.name);if(r&&!r.validate(t,s,e)){i=!1,this.sendErrorMsg(t,r,s);break}}return i}sendErrorMsg(t,s,i){t.page.sendMessage({type:"VALIDATION_ERROR",description:i.errorMessage,metadata:{validator:s.name,control:i.id}})}}class v{constructor(t){this.ctx=t}build(t,s){this.onInput=s,this.clearPage(t),this.ctx.controls.forEach(this.addComponent.bind(this,t))}clearPage(t){for(let s=t.childNodes.length-1;s>=0;s--)t.removeChild(t.childNodes[s])}addComponent(t,s){let i;i="polaris-workflow"===s.tag?this.createWorkflowElement(s):this.createElement(s),t.appendChild(i),this.addErrorLabel(i)}createWorkflowElement(t){const s=document.createElement(t.tag),i=Object.assign(s,t);return i.setServices(this.ctx),i}createElement(t){var s;const i=document.createElement(t.tag),e=Object.assign(i,t,{"wf-Workflow":"",ctx:this.ctx});return t.el=e,this.bind(e),this.bindCaption(e,t),null===(s=t.controls)||void 0===s||s.forEach(this.addComponent.bind(this,e)),e}bind(t){if(!t.id||void 0===t.value)return;const s=this.ctx.model.getValue(t.id);void 0!==s&&(t.value=s),this.ctx.model.setValue(t.id,t.value),t.oninput=this.onInput.bind(this,t)}bindCaption(t,s){this.interpolate("caption",t,s),this.interpolate("textContent",t,s),this.interpolate("innerHTML",t,s)}interpolate(t,s,i){s[t]&&(s[t]=this.ctx.model.getInterpolatedValue(i[t]||s[t]))}addErrorLabel(t){if(!t.validators)return;const s=document.createElement("span");s.setAttribute("wf-error","error"),t.parentNode.appendChild(s)}}class g{constructor(t){this.http=t}async load(t){return await this.http.fetch({url:`[WF]/${t}`,method:"get"})}}const m=class{constructor(i){t(this,i),this.page=this,this._components=[],this.ctx=this,this.http=new r(this.ctx),this.config=new o,this.model=new c(this.ctx.config),this.wf=new d(this.ctx),this.validator=new x,this.wfMessage=s(this,"wfMessage",7)}processChangeHandler(){this.load(this.process,this.activity,this.sessionId)}get controls(){return this._components}set controls(t){this._components=t,this._render()}async setServices(t){this.model=t.model,this.http=t.http,this.config=t.config,this.validator=t.validator}async load(t,s="start",i=""){i&&i.length>0&&(this.ctx.model.sessionId=i,this.ctx.model.load()),await this.wf.setProcess(t,s)}async addActivity(t){u.add(t)}async addValidator(t){this.validator.addValidator(t)}sendMessage(t){var s,i,e;const r={process:null===(s=this.wf.process)||void 0===s?void 0:s.name,activity:null===(i=this.wf.activity)||void 0===i?void 0:i.name,activityType:null===(e=this.wf.activity)||void 0===e?void 0:e.type,timestamp:Date.now()};this.wfMessage.emit(Object.assign(Object.assign({},t),r))}async componentWillLoad(){if(this.url){this.config.addSetting("[settingsUrl]",this.url);const t=await this.http.fetch({method:"GET",url:this.url});Object.keys(t).forEach(s=>this.config.addSetting(s,t[s]))}this._loader||(this._loader=new g(this.http),this.wf.loader=this._loader),this.parent&&this.setServices(this.parent),this.process&&this.load(this.process,this.activity,this.sessionId)}onInput(t){this.model.setValue(t.id,t.value),t.hasAttribute("error")&&this.validator.validate(this)}_render(){new v(this).build(this.el,this.onInput.bind(this))}get el(){return i(this)}static get watchers(){return{process:["processChangeHandler"]}}};export{e as polaris_analytics,m as polaris_workflow};