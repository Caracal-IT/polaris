var __extends=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(e.hasOwnProperty(n))t[n]=e[n]};return t(e,n)};return function(e,n){t(e,n);function r(){this.constructor=e}e.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}();var __awaiter=this&&this.__awaiter||function(t,e,n,r){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{u(r.next(t))}catch(e){o(e)}}function a(t){try{u(r["throw"](t))}catch(e){o(e)}}function u(t){t.done?n(t.value):i(t.value).then(s,a)}u((r=r.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(t){return function(e){return u([t,e])}}function u(s){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(o=s[0]&2?i["return"]:s[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,s[1])).done)return o;if(i=0,o)s=[s[0]&2,o.value];switch(s[0]){case 0:case 1:o=s;break;case 4:n.label++;return{value:s[1],done:false};case 5:n.label++;i=s[1];s=[0];continue;case 7:s=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!o||s[1]>o[0]&&s[1]<o[3])){n.label=s[1];break}if(s[0]===6&&n.label<o[1]){n.label=o[1];o=s;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(s);break}if(o[2])n.ops.pop();n.trys.pop();continue}s=e.call(t,n)}catch(a){s=[6,a];i=0}finally{r=o=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./p-58a46e32.system.js"],(function(t){"use strict";var e,n;return{setters:[function(t){e=t.r;n=t.g}],execute:function(){var r=function(){function t(){}t.prototype.sendMessage=function(t){this.sendPostMessage(t.detail)};t.prototype.send=function(t,e){var n=e.find((function(t){return t["wf-Workflow"]!==undefined}));if(!n)return;var r=this.createPayload(t,n,e);if(r){this.sendPostMessage({type:r.type,process:r.process,activity:r.activity,control:r.control,valueHash:r.valueHash,path:r.wfPath.map(this.getName)})}};t.prototype.getPath=function(t){return t.composedPath(t)};t.prototype.sendPostMessage=function(t){var e=Object.assign(Object.assign({},t),{timestamp:Date.now()});console.log("ANALYTICS",e);window.postMessage(e,"*")};t.prototype.getName=function(t){if(t.id)return t.id;if(t.page&&t.page.name)return t.page.name;return""};t.prototype.createPayload=function(t,e,n){var r=n.filter((function(t){return t.nodeName&&t.nodeName.indexOf("document-fragment")===-1}));var i=r.find((function(t){return t.localName==="polaris-workflow"}));if(!i)return null;var o=i.ctx.wf.activity;var s=r.slice(0,r.indexOf(i)+1);if(!o.name)return null;var a=i.ctx.wf.process.name;var u=o.name;var c=e.id;var f=this.getHashCode(e.value);return{type:t,process:a,activity:u,control:c,valueHash:f,wfPath:s}};t.prototype.getHashCode=function(t){var e=0;var n;if(!t||t.length===0)return e;for(var r=0;r<t.length;r++){n=t.charCodeAt(r);e=(e<<5)-e+n;e|=0}return e};return t}();var i=t("polaris_analytics",function(){function t(t){e(this,t)}t.prototype.analyticsHandler=function(t){return __awaiter(this,void 0,void 0,(function(){var e,n;return __generator(this,(function(r){e=i.analyticsService.getPath(t);if(i.lastPath[0]===e[0])return[2];i.lastPath=e;n=e.find((function(t){return t["wf-Workflow"]!==undefined}));if(!n)return[2];e[0].addEventListener("blur",this.onBlur);i.analyticsService.send("click",e);return[2]}))}))};t.prototype.wfMessage=function(t){i.analyticsService.sendMessage(t)};t.prototype.onBlur=function(t){i.analyticsService.send("blur",i.lastPath);t.target.removeEventListener("blur",this.onBlur)};return t}());i.lastPath=[null];i.analyticsService=new r;var o=function(){function t(t){this.ctx=t}t.prototype.fetch=function(t){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(n){switch(n.label){case 0:return[4,fetch(this.resolveSetting(t.url),this.getConfig(t))];case 1:e=n.sent();return[2,e.json()]}}))}))};t.prototype.getConfig=function(t){return{method:t.method,mode:"cors",headers:Object.apply({"Content-Type":"application/json"},t.headers),redirect:"follow",referrer:"no-referrer",body:t.body?JSON.stringify(t.body):null}};t.prototype.resolveSetting=function(t){var e=this;var n=t.match(/\[[\w|_]+\]/g);if(!n)return t;return n.reduce((function(t,n){return t.replace(n,e.ctx.config.getSetting(n))}),t)};return t}();var s=function(){function t(){this.model={}}t.prototype.getValue=function(t,e){if(e===void 0){e=this.model}var n=t.split(".").reduce((function(t,e){return t?t[e]:undefined}),Object.assign({},e));return n};t.prototype.setValue=function(t,e){this.model=this.merge(this.model,t,e)};t.prototype.merge=function(t,e,n){if(!e)return;var r=Object.assign({},t);e.split(".").reduce((function(t,e,r,i){t[e]=r==i.length-1?n:Object.assign({},t[e]);return t[e]}),r);return r};return t}();var a=function(){function t(){this.settings={"[WF]":"wf"}}t.prototype.getSetting=function(t){return this.settings[t]};return t}();var u=function(){function t(){this.name="redirect";this.type="redirect-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!this.ctx||!this.ctx.wf)return[2,false];console.log("Redirect Activity");if(this.next&&this.next.length>0)this.ctx.wf.goto(this.next);return[2,true]}))}))};return t}();var c=function(){function t(){this.name="finish";this.type="finish-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!this.ctx||!this.ctx.wf)return[2,false];console.log("Finish Activity");if(this.next&&this.next.length>0)this.ctx.wf.goto(this.next);return[2,true]}))}))};return t}();var f=function(){function t(){this.name="ipc";this.type="ipc-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!this.ctx||!this.ctx.wf)return[2,false];console.log("IPC Activity");if(this.next&&this.next.length>0)this.ctx.wf.goto(this.next);return[2,true]}))}))};return t}();var h=function(){function t(){this.name="code";this.type="code-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!this.ctx||!this.ctx.model)return[2,false];this.eval(this.expression,this.ctx);if(this.next&&this.next.length>0)this.ctx.wf.goto(this.next);return[2,true]}))}))};t.prototype.eval=function(t,e){var n=new Function("ctx","model",t);return n(e,e.model)};return t}();var l=function(){function t(){this.name="start";this.type="page-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.ctx&&this.ctx.page&&this.ctx.page.controls)this.ctx.page.controls=this.controls||[];return[2,true]}))}))};return t}();var p=function(){function t(){this.name="undefined";this.type="null-activity"}t.prototype.execute=function(){return new Promise((function(t,e){return e()}))};return t}();var d=function(){function t(){this.name="start";this.type="api-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.endpoints&&this.endpoints.length>0)this.callEndpoints();else if(this.next&&this.ctx)this.gotoNext();return[2,true]}))}))};t.prototype.callEndpoints=function(){var t=this;if(!this.ctx||!this.ctx.http||!this.endpoints)return;var e=0;var n=this.callEndpoint.bind(this,this.ctx.http);this.endpoints.forEach((function(r){e++;r.body=t.getBody(r);n(r).finally((function(){e--;if(e===0)t.gotoNext()}))}))};t.prototype.callEndpoint=function(t,e){return __awaiter(this,void 0,void 0,(function(){var n=this;return __generator(this,(function(r){if(!this.ctx||!this.ctx.config)return[2];return[2,t.fetch(e).then((function(t){return n.setModel(e,t)}))]}))}))};t.prototype.gotoNext=function(){if(this.next&&this.ctx)this.ctx.wf.goto(this.next)};t.prototype.getBody=function(t){if(!this.ctx||!this.ctx.model||t.method.toUpperCase()==="GET"||t.method.toUpperCase()==="DELETE")return null;var e=this.ctx.model;var n=t.mappings;var r={};n.filter((function(t){return t.direction==="out"||t.direction==="inout"})).forEach((function(t){var n;return Object.assign(r,(n={},n[t.client]=e.getValue(t.client),n))}));return JSON.stringify(r)};t.prototype.setModel=function(t,e){if(!this.ctx||!this.ctx.model)return;var n=this.ctx.model;var r=t.mappings;if(!r||r.length===0)return Object.keys(e).forEach((function(t){return n.setValue(t,e[t])}));r.filter((function(t){return t.direction==="in"||t.direction==="inout"})).forEach((function(t){return n.setValue(t.client,n.getValue(t.remote,e))}))};return t}();var v=function(){function t(){this.name="assign";this.type="assign-activity"}t.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){if(!this.ctx||!this.ctx.model)return[2,false];t=this.value||"";if(this.value&&this.value.startsWith("{")&&this.value.endsWith("}"))t=this.ctx.model.getValue(this.value.substring(1,this.value.length-1));this.ctx.model.setValue(this.key,t);this.ctx.wf.goto(this.next);return[2,true]}))}))};return t}();var g=function(t){__extends(e,t);function e(){var e=t.apply(this,arguments)||this;e.name="assign";e.type="decision-activity";return e}e.prototype.execute=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,n,r;return __generator(this,(function(i){if(!this.ctx||!this.ctx.model||!this.conditions)return[2,false];t=true;for(e=0,n=this.conditions;e<n.length;e++){r=n[e];if(r.operator==="or")t=t||this.validate(r);else t=t&&this.validate(r)}if(t)this.ctx.wf.goto(this.trueAction);else this.ctx.wf.goto(this.falseAction);return[2,true]}))}))};e.prototype.validate=function(e){try{var n=e.left;if(e.left&&e.left.startsWith("{")&&e.left.endsWith("}"))n=this.ctx.model.getValue(e.left.substring(1,e.left.length-1));var r="return "+n+" "+e.equality+" "+e.right+";";return t.prototype.eval.call(this,r,this.ctx)}catch(i){console.warn("Decision Activity",i);return false}};return e}(h);var y=function(){function t(){}t.create=function(e,n){if(!e||!e.type)return new p;var r=t.activities.find((function(t){return t.type===e.type}));if(!r)return new p;return Object.assign(r,e,{ctx:n})};return t}();y.activities=[new p,new l,new d,new v,new h,new g,new f,new c,new u];var x=function(){function t(t){this.ctx=t}t.prototype.setProcess=function(t,e){if(e===void 0){e="start"}return __awaiter(this,void 0,void 0,(function(){var n;return __generator(this,(function(r){switch(r.label){case 0:r.trys.push([0,4,,5]);if(!(typeof t==="string"))return[3,2];return[4,this.ctx.http.fetch({url:"[WF]/"+t,method:"get"})];case 1:t=r.sent();r.label=2;case 2:this.process=t;this.activity=null;return[4,this.goto(e)];case 3:r.sent();return[3,5];case 4:n=r.sent();console.error(n);return[3,5];case 5:return[2]}}))}))};t.prototype.goto=function(t){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(n){if(!this.process||!this.process.activities)return[2];if(((e=this.ctx.wf.activity)===null||e===void 0?void 0:e.type)==="page-activity"&&!this.ctx.validator.validate())return[2];this.activity=this.process.activities.find((function(e){return e.name==t}));return[2,y.create(this.activity,this.ctx).execute()]}))}))};return t}();var w=function(){function t(t){this.name=t}t.prototype.setError=function(t,e,n){t.error=e;t.errorMessage=e?n:null;if(t.el){t.el.setAttribute("error",t.error?"true":"false");t.el.setAttribute("errorMessage",t.errorMessage)}if(t.el.nextSibling["attributes"]["wf-error"])t.el.nextSibling.textContent=t.errorMessage};return t}();var _=function(t){__extends(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.validate=function(e,n,r){var i=e.model.getValue(n.id);var o=i===null||i===undefined||i.length===0;t.prototype.setError.call(this,n,o,r.message);return!o};return e}(w);var m=function(){function t(t){this.ctx=t;this.validators=[new _("Required")]}t.prototype.validate=function(){if(!this.ctx.page||!this.ctx.page.controls)return true;var t=true;for(var e=0,n=this.ctx.page.controls;e<n.length;e++){var r=n[e];t=this.validateControl(r)&&t}return t};t.prototype.validateControl=function(t){if(!t)return true;var e=true;for(var n in t.controls)e=this.validateControl(t.controls[n])&&e;if(t.validators&&t.validators.length>0){var r=function(n){var r=i.validators.find((function(t){return t.name===n.name}));if(!r)return"continue";if(!r.validate(i.ctx,t,n))e=false};var i=this;for(var o=0,s=t.validators;o<s.length;o++){var a=s[o];r(a)}}return e};return t}();var b=t("polaris_workflow",function(){function t(t){e(this,t);this.page=this;this.model=new s;this.http=new o(this);this.config=new a;this.wf=new x(this);this.validator=new m(this);this._components=[];this.ctx=this}t.prototype.processChangeHandler=function(){this._render()};Object.defineProperty(t.prototype,"controls",{get:function(){return this._components},set:function(t){this._components=t;this._render()},enumerable:true,configurable:true});t.prototype.load=function(t,e){if(e===void 0){e="start"}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(n){switch(n.label){case 0:return[4,this.wf.setProcess(t,e)];case 1:n.sent();return[2]}}))}))};t.prototype.componentWillLoad=function(){if(this.process)this.load(this.process)};t.prototype._render=function(){for(var t=this.el.childNodes.length-1;t>=0;t--)this.el.removeChild(this.el.childNodes[t]);this.controls.forEach(this.renderComponent.bind(this,this.el))};t.prototype.renderComponent=function(t,e){var n;var r=document.createElement(e.tag);var i={"wf-Workflow":"",ctx:this};var o=Object.assign(r,e,i);e.el=o;this.bind(o);(n=e.controls)===null||n===void 0?void 0:n.forEach(this.renderComponent.bind(this,o));t.appendChild(o);this.addErrorLabel(o)};t.prototype.bind=function(t){if(!t.id||t.value===undefined)return;var e=this.model.getValue(t.id);if(e!==undefined)t.value=e;this.model.setValue(t.id,t.value);t.oninput=this.onInput.bind(this,t)};t.prototype.onInput=function(t){this.model.setValue(t.id,t.value);if(t.hasAttribute("error"))this.validator.validate()};t.prototype.addErrorLabel=function(t){if(!t.validators)return;var e=document.createElement("span");e.setAttribute("wf-error","error");t.parentNode.appendChild(e)};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:true,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{process:["processChangeHandler"]}},enumerable:true,configurable:true});return t}())}}}));