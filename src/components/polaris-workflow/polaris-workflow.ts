import { Component } from "../../model/component.model";

import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { WorkflowService } from "../../services/workflow.service";

export class PolarisWorkflow extends HTMLElement implements Context {
    static get observedAttributes() {
        return ['process'];
    }

    private _controls: Array<any> = [];

    page = this;
    http: HttpService = new HttpService();
    wf:WorkflowService = new WorkflowService(this);
    
    get controls() {return this._controls}
    set controls(val) { 
        this._controls = val||[]; 
        this.render();
    }

    attributeChangedCallback(_attrName: string, _oldVal: string, _newVal: string) {
        if(_attrName === "process")
            this.load(_newVal);
    }

    load(process: any, next = "start"){
        this.wf.setProcess(process, next);       
    }

    private render() {
        for(let i = this.childNodes.length - 1; i >= 0; i--) 
            this.removeChild(this.childNodes[i]);

        this.controls.forEach(this.renderComponent.bind(this));
    }

    private renderComponent(config: Component) {
        const el = document.createElement(config.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this
        };

        const newEl = Object.assign(el, config, options);

        this.appendChild(newEl);
    }
}

window.customElements.define('polaris-workflow', PolarisWorkflow);
