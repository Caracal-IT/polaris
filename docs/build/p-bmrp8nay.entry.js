import{r as t,g as s}from"./p-802f252a.js";const e=class{constructor(s){t(this,s)}render(){if(this.el.shadowRoot.prepend){const t=document.createElement("h1");this.el.shadowRoot.prepend(t),t.textContent=this.caption,Array.from(this.el.childNodes).forEach(t=>this.el.shadowRoot.appendChild(t))}else{const t=document.createElement("h1");this.el.shadowRoot.insertBefore(t,this.el.shadowRoot.firstChild),t.textContent=this.caption}}get el(){return s(this)}static get style(){return"*{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:600px;border:1px solid #000;border-radius:15px;border:2px solid var(--primary-border-color,#757575);-webkit-box-shadow:3px 4px 3px rgba(0,0,0,.3);box-shadow:3px 4px 3px rgba(0,0,0,.3);padding:5px}h1{color:var(--primary-border-color,purple)}input{font-size:1rem;padding:.8rem .8rem .8rem .4rem;margin:5px 1px;display:block;width:100%;border-radius:10px;border:1px solid var(--primary-border-color,#757575)}input:focus{outline:none;margin:4px 0;border:2px solid var(--primary-border-color,purple)}input[error=true]{margin:4px 0;background-color:#ffb6c1;border:2px solid red}[wf-error]{color:red;font-weight:bolder}moon-button{-ms-flex-item-align:end;align-self:flex-end}"}};export{e as moon_panel};