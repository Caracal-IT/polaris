var __extends=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(e.hasOwnProperty(n))t[n]=e[n]};return t(e,n)};return function(e,n){t(e,n);function i(){this.constructor=e}e.prototype=n===null?Object.create(n):(i.prototype=n.prototype,new i)}}();var __awaiter=this&&this.__awaiter||function(t,e,n,i){function r(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{c(i.next(t))}catch(e){o(e)}}function a(t){try{c(i["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):r(t.value).then(s,a)}c((i=i.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},i,r,o,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(t){return function(e){return c([t,e])}}function c(s){if(i)throw new TypeError("Generator is already executing.");while(n)try{if(i=1,r&&(o=s[0]&2?r["return"]:s[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;if(r=0,o)s=[s[0]&2,o.value];switch(s[0]){case 0:case 1:o=s;break;case 4:n.label++;return{value:s[1],done:false};case 5:n.label++;r=s[1];s=[0];continue;case 7:s=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!o||s[1]>o[0]&&s[1]<o[3])){n.label=s[1];break}if(s[0]===6&&n.label<o[1]){n.label=o[1];o=s;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(s);break}if(o[2])n.ops.pop();n.trys.pop();continue}s=e.call(t,n)}catch(a){s=[6,a];r=0}finally{i=o=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./p-8547f30f.system.js"],(function(t){"use strict";var e,n,i,r;return{setters:[function(t){e=t.r;n=t.h;i=t.c;r=t.g}],execute:function(){var o=function(){function t(){}t.prototype.sendMessage=function(t){this.sendPostMessage(t.detail)};t.prototype.send=function(t,e){var n=e.find((function(t){return t["wf-Workflow"]!==undefined}));if(!n)return;var i=this.createPayload(t,n,e);if(i){this.sendPostMessage({type:i.type,process:i.process,activity:i.activity,control:i.control,valueHash:i.valueHash,path:i.wfPath.map(this.getName)})}};t.prototype.getPath=function(t){return t.composedPath(t)};t.prototype.sendPostMessage=function(t){var e=Object.assign(Object.assign({},t),{timestamp:Date.now()});console.log("ANALYTICS",e);window.postMessage(e,"*")};t.prototype.getName=function(t){if(t.id)return t.id;if(t.page&&t.page.name)return t.page.name;return""};t.prototype.createPayload=function(t,e,n){var i=n.filter((function(t){return t.nodeName&&t.nodeName.indexOf("document-fragment")===-1}));var r=i.find((function(t){return t.localName==="polaris-workflow"}));if(!r)return null;var o=r.ctx.wf.activity;var s=i.slice(0,i.indexOf(r)+1);if(!o.name)return null;var a=r.ctx.wf.process.name;var c=o.name;var u=e.id;var f=this.getHashCode(e.value);return{type:t,process:a,activity:c,control:u,valueHash:f,wfPath:s}};t.prototype.getHashCode=function(t){var e=0;var n;if(!t||t.length===0)return e;for(var i=0;i<t.length;i++){n=t.charCodeAt(i);e=(e<<5)-e+n;e|=0}return e};return t}();var s=t("polaris_analytics",function(){function t(t){e(this,t)}t.prototype.analyticsHandler=function(t){return __awaiter(this,void 0,void 0,(function(){var e,n;return __generator(this,(function(i){e=s.analyticsService.getPath(t);if(s.lastPath[0]===e[0])return[2];s.lastPath=e;n=e.find((function(t){return t["wf-Workflow"]!==undefined}));if(!n)return[2];return[2]}))}))};return t}());s.lastPath=[null];s.analyticsService=new o;var a=t("polaris_loader",function(){function t(t){e(this,t);this.isVisible=false;this.showLoader=false}t.prototype.wfMessage=function(t){var e=t.detail;switch(e.type){case"START_LOADING":this.show(true);break;case"END_LOADING":this.show(false);break}};t.prototype.show=function(t){var e=this;this.showLoader=t;setTimeout((function(){return e.isVisible=e.showLoader}),300)};t.prototype.render=function(){if(this.isVisible)return n("div",{id:"loadingPanel"})};Object.defineProperty(t,"style",{get:function(){return"div{position:fixed;left:0;top:0;min-width:100vw;min-height:100vh;z-index:99999999;background:rgba(0,0,0,.611)}div:after{content:\"Loading...\";position:absolute;display:block;background-color:#fff;width:6rem;height:1.5rem;line-height:1.5rem;text-align:center;font-weight:bolder;font-size:1.2rem;color:#8a2be2;border:1px solid #000;border-radius:5px;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"},enumerable:true,configurable:true});return t}());var c=function(){function t(t){this.ctx=t}t.prototype.fetch=function(t){return __awaiter(this,void 0,void 0,(function(){var e;var n=this;return __generator(this,(function(i){switch(i.label){case 0:i.trys.push([0,,2,3]);this.ctx.page.sendMessage({type:"START_LOADING"});return[4,fetch(this.resolveSetting(t.url),this.getConfig(t))];case 1:e=i.sent();return[2,e.json()];case 2:setTimeout((function(){return n.ctx.page.sendMessage({type:"END_LOADING"})}));return[7];case 3:return[2]}}))}))};t.prototype.getConfig=function(t){return{method:t.method,mode:"cors",headers:Object.apply({"Content-Type":"application/json"},t.headers),redirect:"follow",referrer:"no-referrer",body:t.body?JSON.stringify(t.body):null}};t.prototype.resolveSetting=function(t){var e=this;var n=t.match(/\[[\w|_]+\]/g);if(!n)return t;return n.reduce((function(t,n){return t.replace(n,e.ctx.config.getSetting(n))}),t)};return t}();function u(t,e){var n=e[0],i=e[1];var r=new Intl.NumberFormat(n,{style:"currency",currency:i});return r.format(+t)}var f=function(){function t(){this.currencyFormat=u}return t}();var h=function(){function t(t){this.config=t;this.model={};this.sessionId=this.UUID();this.pipes=new f}t.prototype.getValue=function(t,e){if(e===void 0){e=this.model}if(t.indexOf("[")===0||t.indexOf("]")===t.length-1)return this.config.getSetting(t);var n=t.split(".").reduce((function(t,e){return t?t[e]:undefined}),Object.assign({},e));if(!t.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g)&&n===undefined)return t;return n};t.prototype.getInterpolatedValue=function(t){var e=this;if(!t)return t;var n=/\{\{(?:(\w|\.|\||-)+)\}\}/g;var i=t.match(n);if(!i||i.length===0)return t;return i.reduce((function(t,n){return e.replaceAll(t,n)}),t)};t.prototype.setValue=function(t,e){if(t.indexOf("[")===0||t.indexOf("]")===t.length-1)this.config.addSetting(t,e);else this.model=this.merge(this.model,t,e)};t.prototype.save=function(){sessionStorage.setItem(this.sessionId,JSON.stringify(this.model))};t.prototype.load=function(){var t=sessionStorage.getItem(this.sessionId);this.clearCache();if(!t)return;this.model=JSON.parse(t)};t.prototype.clearCache=function(){sessionStorage.clear()};t.prototype.merge=function(t,e,n){if(!e)return;var i=Object.assign({},t);e.split(".").reduce((function(t,e,i,r){t[e]=i==r.length-1?n:Object.assign({},t[e]);return t[e]}),i);return i};t.prototype.UUID=function(){return"xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=Math.random()*16|0,n=t=="x"?e:e&3|8;return n.toString(16)}))};t.prototype.replaceAll=function(t,e){var n=e.substring(2,e.length-2);var i=n.split("|");var r=i.slice(2);var o=this.getValue(i[0]);if(i&&i.length>1&&this.pipes[i[1]])o=this.pipes[i[1]](o,r);return t.replace(e,o)};return t}();var l=function(){function t(){this.settings={}}t.prototype.getSetting=function(t){return this.settings[t]};t.prototype.addSetting=function(t,e){this.settings[t]=e};return t}();var p=function(){function t(){this.name="redirect";this.type="redirect-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t,e;return __generator(this,(function(n){if(!this.ctx||!this.ctx.wf)return[2,false];this.ctx.model.save();e=((t=this.ctx.wf.process)===null||t===void 0?void 0:t.name)+"-"+this.next+"-"+this.ctx.model.sessionId;window.location.href=this.location+"?returnUrl="+e;return[2,true]}))}))};return t}();var d=function(){function t(){this.name="finish";this.type="finish-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){if(!this.ctx||!this.ctx.wf)return[2,false];if(this.ctx.wf.stack.length===0){if(this.next)this.ctx.wf.goto(this.next);return[2,true]}t=this.ctx.wf.stack.pop();this.ctx.wf.setProcess(t.process,t.activity);return[2,true]}))}))};return t}();var v=function(){function t(){this.name="ipc";this.type="ipc-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){if(!this.ctx||!this.ctx.wf)return[2,false];if(this.process&&this.process.length>0){this.ctx.wf.stack.push({process:(t=this.ctx.wf.process)===null||t===void 0?void 0:t.name,activity:this.next});this.ctx.wf.setProcess(this.process,"start",this.next?false:true)}return[2,true]}))}))};return t}();var g=function(){function t(){this.name="code";this.type="code-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!this.ctx||!this.ctx.model)return[2,false];this.eval(this.expression,this.ctx);if(this.next&&this.next.length>0)this.ctx.wf.goto(this.next);return[2,true]}))}))};t.prototype.eval=function(t,e){var n=new Function("ctx","model",t);return n(e,e.model)};return t}();var y=function(){function t(){this.name="start";this.type="page-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.ctx&&this.ctx.page&&this.ctx.page.controls)this.ctx.page.controls=this.controls||[];return[2,true]}))}))};return t}();var x=function(){function t(){this.name="undefined";this.type="null-activity"}t.prototype.execute=function(){return new Promise((function(t,e){return e()}))};return t}();var m=function(){function t(){this.name="start";this.type="api-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.endpoints&&this.endpoints.length>0)setTimeout(this.callEndpoints.bind(this));else if(this.next&&this.ctx)this.gotoNext();return[2,true]}))}))};t.prototype.callEndpoints=function(){var t=this;if(!this.ctx||!this.ctx.http||!this.endpoints)return;var e=0;var n=this.callEndpoint.bind(this,this.ctx.http);this.endpoints.forEach((function(i){e++;i.body=t.getBody(i);n(i).finally((function(){e--;if(e===0)t.gotoNext()}))}))};t.prototype.callEndpoint=function(t,e){return __awaiter(this,void 0,void 0,(function(){var n=this;return __generator(this,(function(i){if(!this.ctx||!this.ctx.config)return[2];return[2,t.fetch(e).then((function(t){return n.setModel(e,t)}))]}))}))};t.prototype.gotoNext=function(){if(this.next&&this.ctx)this.ctx.wf.goto(this.next)};t.prototype.getBody=function(t){if(!this.ctx||!this.ctx.model||t.method.toUpperCase()==="GET"||t.method.toUpperCase()==="DELETE")return null;var e=this.ctx.model;var n=t.mappings;var i={};n.filter((function(t){return t.direction==="out"||t.direction==="inout"})).forEach((function(t){var n;return Object.assign(i,(n={},n[t.remote]=e.getValue(t.client),n))}));return i};t.prototype.setModel=function(t,e){if(!this.ctx||!this.ctx.model)return;var n=this.ctx.model;var i=t.mappings;if(!i||i.length===0)return Object.keys(e).forEach((function(t){return n.setValue(t,e[t])}));i.filter((function(t){return t.direction==="in"||t.direction==="inout"})).forEach((function(t){return n.setValue(t.client,n.getValue(t.remote,e))}))};return t}();var w=function(){function t(){this.name="assign";this.type="assign-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){if(!this.ctx||!this.ctx.model)return[2,false];t=this.value||"";if(this.value&&this.value.startsWith("{")&&this.value.endsWith("}"))t=this.ctx.model.getValue(this.value.substring(1,this.value.length-1));this.ctx.model.setValue(this.key,t);this.ctx.wf.goto(this.next);return[2,true]}))}))};return t}();var _=function(t){__extends(e,t);function e(){var e=t.apply(this,arguments)||this;e.name="assign";e.type="decision-activity";return e}e.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,n,i;return __generator(this,(function(r){if(!this.ctx||!this.ctx.model||!this.conditions)return[2,false];t=true;for(e=0,n=this.conditions;e<n.length;e++){i=n[e];if(i.operator==="or")t=t||this.validate(i);else t=t&&this.validate(i)}if(t)this.ctx.wf.goto(this.trueAction);else this.ctx.wf.goto(this.falseAction);return[2,true]}))}))};e.prototype.validate=function(e){try{var n=e.left;if(e.left&&e.left.startsWith("{")&&e.left.endsWith("}"))n=this.ctx.model.getValue(e.left.substring(1,e.left.length-1));var i="return "+n+" "+e.equality+" "+e.right+";";return t.prototype.eval.call(this,i,this.ctx)}catch(r){console.warn("Decision Activity",r);return false}};return e}(g);var b=function(){function t(){}t.create=function(e,n){if(!e||!e.type)return new x;var i=t.activities.find((function(t){return t.type===e.type}));if(!i)return new x;return Object.assign(i,e,{ctx:n})};return t}();b.activities=[new x,new y,new m,new w,new g,new _,new v,new d,new p];var O=function(){function t(t){this.ctx=t;this.stack=[]}t.prototype.setProcess=function(t,e,n){if(e===void 0){e="start"}if(n===void 0){n=true}return __awaiter(this,void 0,void 0,(function(){var i;return __generator(this,(function(r){switch(r.label){case 0:r.trys.push([0,3,,4]);if(n)this.stack=[];if(!(typeof t==="string"))return[3,2];return[4,this.ctx.http.fetch({url:"[WF]/"+t,method:"get"})];case 1:t=r.sent();r.label=2;case 2:this.process=t;this.activity=null;this.goto(e);this.ctx.page.sendMessage({type:"PROCESS_CHANGED",metadata:{stack:this.stack}});return[3,4];case 3:i=r.sent();if(i){console.error(i);this.ctx.page.sendMessage({type:"ERROR",description:i.message,metadata:i})}return[3,4];case 4:return[2]}}))}))};t.prototype.goto=function(t){setTimeout(this.tryNext.bind(this,t))};t.prototype.tryNext=function(t){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(n){switch(n.label){case 0:n.trys.push([0,2,,3]);this.ctx.page.sendMessage({type:"WORKFLOW_CHANGING"});return[4,this.next(t)];case 1:n.sent();this.ctx.page.sendMessage({type:"WORKFLOW_CHANGED"});return[3,3];case 2:e=n.sent();this.ctx.page.sendMessage({type:"ERROR",description:e===null||e===void 0?void 0:e.message,metadata:e});return[3,3];case 3:return[2]}}))}))};t.prototype.next=function(t){return __awaiter(this,void 0,void 0,(function(){var e,n;return __generator(this,(function(i){switch(i.label){case 0:if(!this.process||!this.process.activities)return[2,null];if(((e=this.ctx.wf.activity)===null||e===void 0?void 0:e.type)==="page-activity"&&!this.ctx.validator.validate(this.ctx))return[2,null];n=this.process.activities.find((function(e){return e.name==t}));if(!n)throw new Error("Activity "+t+" not found");this.activity=n;return[4,b.create(this.activity,this.ctx).execute()];case 1:return[2,i.sent()]}}))}))};return t}();var E=function(){function t(t){this.name=t}t.prototype.setError=function(t,e,n){t.error=e;t.errorMessage=e?n:null;if(t.el){t.el.setAttribute("error",t.error?"true":"false");t.el.setAttribute("errorMessage",t.errorMessage)}if(t.el.nextSibling["attributes"]["wf-error"])t.el.nextSibling.textContent=t.errorMessage};return t}();var S=function(t){__extends(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.validate=function(e,n,i){var r=e.model.getValue(n.id);var o=r===null||r===undefined||r.length===0;t.prototype.setError.call(this,n,o,i.message);return!o};return e}(E);var C=function(){function t(){this.validators=[new S("Required")]}t.prototype.validate=function(t){if(!t.page||!t.page.controls)return true;var e=true;for(var n=0,i=t.page.controls;n<i.length;n++){var r=i[n];e=this.validateControl(t,r)&&e}return e};t.prototype.validateControl=function(t,e){if(!e)return true;var n=true;for(var i in e.controls)n=this.validateControl(t,e.controls[i])&&n;if(e.validators&&e.validators.length>0){var r=function(i){var r=o.validators.find((function(t){return t.name===i.name}));if(!r)return"continue";if(!r.validate(t,e,i)){n=false;o.sendErrorMsg(t,r,e)}};var o=this;for(var s=0,a=e.validators;s<a.length;s++){var c=a[s];r(c)}}return n};t.prototype.sendErrorMsg=function(t,e,n){t.page.sendMessage({type:"VALIDATION_ERROR",description:n.errorMessage,metadata:{validator:e.name,control:n.id}})};return t}();var P=function(){function t(t){this.ctx=t}t.prototype.build=function(t,e){this.onInput=e;this.clearPage(t);this.ctx.controls.forEach(this.addComponent.bind(this,t))};t.prototype.clearPage=function(t){for(var e=t.childNodes.length-1;e>=0;e--)t.removeChild(t.childNodes[e])};t.prototype.addComponent=function(t,e){var n;if(e.tag==="polaris-workflow")n=this.createWorkflowElement(e);else n=this.createElement(e);t.appendChild(n);this.addErrorLabel(n)};t.prototype.createWorkflowElement=function(t){var e=document.createElement(t.tag);var n=Object.assign(e,t);n.setServices(this.ctx);return n};t.prototype.createElement=function(t){var e;var n=document.createElement(t.tag);var i={"wf-Workflow":"",ctx:this.ctx};var r=Object.assign(n,t,i);t.el=r;this.bind(r);this.bindCaption(r,t);(e=t.controls)===null||e===void 0?void 0:e.forEach(this.addComponent.bind(this,r));return r};t.prototype.bind=function(t){if(!t.id||t.value===undefined)return;var e=this.ctx.model.getValue(t.id);if(e!==undefined)t.value=e;this.ctx.model.setValue(t.id,t.value);t.oninput=this.onInput.bind(this,t)};t.prototype.bindCaption=function(t,e){this.interpolate("caption",t,e);this.interpolate("textContent",t,e);this.interpolate("innerHTML",t,e)};t.prototype.interpolate=function(t,e,n){if(!e[t])return;e[t]=this.ctx.model.getInterpolatedValue(n[t]||e[t])};t.prototype.addErrorLabel=function(t){if(!t.validators)return;var e=document.createElement("span");e.setAttribute("wf-error","error");t.parentNode.appendChild(e)};return t}();var M=t("polaris_workflow",function(){function t(t){e(this,t);this.page=this;this._components=[];this.ctx=this;this.http=new c(this.ctx);this.config=new l;this.model=new h(this.ctx.config);this.wf=new O(this.ctx);this.validator=new C;this.wfMessage=i(this,"wfMessage",7)}t.prototype.processChangeHandler=function(){this.load(this.process,this.activity,this.sessionId)};Object.defineProperty(t.prototype,"controls",{get:function(){return this._components},set:function(t){this._components=t;this._render()},enumerable:true,configurable:true});t.prototype.setServices=function(t){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){this.model=t.model;this.http=t.http;this.config=t.config;this.validator=t.validator;return[2]}))}))};t.prototype.load=function(t,e,n){if(e===void 0){e="start"}if(n===void 0){n=""}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(i){switch(i.label){case 0:if(n&&n.length>0){this.ctx.model.sessionId=n;this.ctx.model.load()}return[4,this.wf.setProcess(t,e)];case 1:i.sent();return[2]}}))}))};t.prototype.sendMessage=function(t){var e,n,i;var r={process:(e=this.wf.process)===null||e===void 0?void 0:e.name,activity:(n=this.wf.activity)===null||n===void 0?void 0:n.name,activityType:(i=this.wf.activity)===null||i===void 0?void 0:i.type,timestamp:Date.now()};this.wfMessage.emit(Object.assign(Object.assign({},t),r))};t.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,(function(){var t;var e=this;return __generator(this,(function(n){switch(n.label){case 0:if(!this.url)return[3,2];this.config.addSetting("[settingsUrl]",this.url);return[4,this.http.fetch({method:"GET",url:this.url})];case 1:t=n.sent();Object.keys(t).forEach((function(n){return e.config.addSetting(n,t[n])}));n.label=2;case 2:if(this.parent)this.setServices(this.parent);if(this.process)this.load(this.process,this.activity,this.sessionId);return[2]}}))}))};t.prototype.onInput=function(t){this.model.setValue(t.id,t.value);if(t.hasAttribute("error"))this.validator.validate(this)};t.prototype._render=function(){var t=new P(this);t.build(this.el,this.onInput.bind(this))};Object.defineProperty(t.prototype,"el",{get:function(){return r(this)},enumerable:true,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{process:["processChangeHandler"]}},enumerable:true,configurable:true});return t}())}}}));