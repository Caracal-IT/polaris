import { Context } from "../../model/context.model";
import { WorkflowService } from "../../services/workflow.service";

export class PolarisWorkflow extends HTMLElement implements Context {
    static get observedAttributes() {
        return ['process'];
    }

    private _controls: Array<any> = [];

    wf:WorkflowService = new WorkflowService(this);
    page = this;
    
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

        this.controls.forEach(c => {
            const el = document.createElement(c.tag);
            const options = {
                "wf-Workflow": ""
            };
            const newEl = Object.assign(el, c, options);

            this.appendChild(newEl);
        });
    }
}

window.customElements.define('polaris-workflow', PolarisWorkflow);
