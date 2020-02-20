import { Component, Prop, Element, Watch, Method } from "@stencil/core";

import { Control } from "../../model/control.model";

import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { ConfigService } from "../../services/config.service";
import { WorkflowService } from "../../services/workflow.service";
import { ValidatorService } from "../../services/validator.service";

@Component({
    tag: "polaris-workflow",
    shadow: false
  })
  export class PolarisWorkflow implements Control {    
    page = this;

    model: ModelService = new ModelService();
    http: HttpService = new HttpService(this);
    config: ConfigService = new ConfigService();
    wf:WorkflowService = new WorkflowService(this);
    validator: ValidatorService = new ValidatorService(this);

    private _components: Array<any> = [];
    
    @Prop() tag: string;
    @Prop() ctx: Context = this;
    @Prop() value?: any;  

    @Prop() process: string|object;
    @Element() el: HTMLElement;

    @Watch("process")
    processChangeHandler() {                       
        this._render();
    }

    get controls(){return this._components; }
    set controls(val: any) { 
        this._components = val; 
        this._render(); 
    }
    
    @Method()
    async load(process: any, next = "start"){
        await this.wf.setProcess(process, next);       
    }

    componentWillLoad(){
        if(this.process)
            this.load(this.process);
    }

    _render() {           
        for(let i = this.el.childNodes.length - 1; i >= 0; i--) 
            this.el.removeChild(this.el.childNodes[i]);

        this.controls.forEach(this.renderComponent.bind(this, this.el));
    }

    private renderComponent(parent: HTMLElement, control: Control) {
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this  
        };

        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        
        this.bind(newEl);
        control.controls?.forEach(this.renderComponent.bind(this, newEl));

        parent.appendChild(newEl);
        this.addErrorLabel(newEl);
    }

    private bind(newEl: HTMLElement & Control){
        if(!newEl.id || newEl.value === undefined)
            return;

        const newValue = this.model.getValue(newEl.id);

        if(newValue !== undefined)
            newEl.value = newValue;
        
        this.model.setValue(newEl.id, newEl.value);
        newEl.oninput = this.onInput.bind(this, newEl);
    }

    private onInput(newEl: HTMLElement & Control) {
        this.model.setValue(newEl.id, newEl.value);

        if(newEl.hasAttribute('error'))
            this.validator.validate();
    }

    private addErrorLabel(newEl: HTMLElement & Control) {
        if(!newEl.validators)
            return;

        const errLabel = document.createElement("span");
        errLabel.setAttribute("wf-error", "error");

        newEl.parentNode.appendChild(errLabel);
    }
  }