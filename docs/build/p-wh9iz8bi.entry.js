import{r as t,h as s,g as i}from"./p-802f252a.js";const n=class{constructor(s){t(this,s)}locationChangeHandler(){this.setProcess()}componentWillLoad(){this.baseUrl=this.ctx.config.getSetting("[baseUrl]"),this.setProcess()}componentDidLoad(){const t=this.el.querySelector("#mainWf");t&&t.setServices(this.ctx)}render(){return s("div",{id:"mainContent"},s("polaris-workflow",{parent:this.ctx,id:"mainWf",process:this.process,activity:this.activity,sessionId:this.sessionId}))}setProcess(){const t=window.location.hash.replace("#","").split("-");if(this.process===t[0]||"default"===t[0])return;this.process=t[0],this.activity=t.length>1?t[1]:"start",this.sessionId=t.length>2?t[2]:null;const s=this.el.querySelector("#mainWf");s&&s.load(this.process,this.activity,this.sessionId),window.location.hash=this.process}get el(){return i(this)}static get style(){return":host{margin:10px;max-width:600px}h1{color:purple}.text{margin:5px;color:#757575}.error{color:red}.success{color:#006400;font-weight:bolder}input{font-size:1rem;padding:.8rem .8rem .8rem .4rem;margin:5px 1px;display:block;width:100%;border-radius:10px;border:1px solid var(--primary-border-color,#757575)}input:focus{outline:none;margin:4px 0;border:2px solid var(--primary-border-color,purple)}input[error=true]{margin:4px 0;background-color:#ffb6c1;border:2px solid red}[wf-error]{color:red;font-weight:bolder}"}};export{n as polaris_main};