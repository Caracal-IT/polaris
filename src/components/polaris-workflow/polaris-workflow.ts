import { Component } from "../../model/component.model";

import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { WorkflowService } from "../../services/workflow.service";

export class PolarisWorkflow extends HTMLElement implements Context {
    static get observedAttributes() {
        return ['process'];
    }

    private _components: Array<any> = [];

    page = this;
    http: HttpService = new HttpService();
    model: ModelService = new ModelService();
    wf:WorkflowService = new WorkflowService(this);
    
    get components() {return this._components}
    set components(val) { 
        this._components = val||[]; 
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

        this.components.forEach(this.renderComponent.bind(this, this));
    }

    private renderComponent(parent: HTMLElement, config: Component) {
        const el = document.createElement(config.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this
        };

        const newEl = Object.assign(el, config, options);
        
        if(newEl.id && newEl.value !== undefined) {
            const newValue = this.model.getValue(newEl.id);

            if(newValue !== undefined)
                newEl.value = newValue;
            
            this.model.setValue(newEl.id, newEl.value);

            newEl.onchange = (event: any) => this.model.setValue(event.target.id, event.target.value);
        }

        if(config.components)
            config.components.forEach(this.renderComponent.bind(this, newEl));

        parent.appendChild(newEl);
    }
}

window.customElements.define('polaris-workflow', PolarisWorkflow);
