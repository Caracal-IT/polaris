import { Component, Prop, Element, Watch, Method, Event, EventEmitter } from "@stencil/core";

import { Control } from "../../model/control.model";

import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { ConfigService } from "../../services/config.service";
import { WorkflowService } from "../../services/workflow.service";
import { ValidatorService } from "../../services/validator.service";
import { Message } from "../../model/message.model";

@Component({
    tag: "polaris-workflow",
    shadow: false
  })
  export class PolarisWorkflow implements Control {    
    page = this;

    model: ModelService;
    http: HttpService;
    config: ConfigService;
    wf:WorkflowService;
    validator: ValidatorService;

    private _components: Array<any> = [];
    
    @Prop() tag: string;
    @Prop() ctx: Context = this;
    @Prop() value?: any;  

    @Prop() process: string|object;
    @Prop() activity: string;
    @Prop() sessionId: string;
    
    @Element() el: HTMLElement;

    @Watch("process")
    processChangeHandler() {      
        this.load(this.process, this.activity, this.sessionId);
    }

    @Event()
    wfMessage: EventEmitter;

    get controls(){return this._components; }
    set controls(val: any) { 
        this._components = val; 
        this._render(); 
    }

    @Method()
    async setServices(
        model: ModelService,
        http: HttpService,
        config: ConfigService,
        wf:WorkflowService,
        validator: ValidatorService
    ){
        this.model = model;
        this.http = http;
        this.config = config;
        this.wf = wf;
        this.validator = validator;

        this.initialize();
    }
    
    @Method()
    async load(process: any, next = "start", sessionId = '') {
        if(sessionId && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        
        await this.wf.setProcess(process, next);       
    }

    sendMessage(message: Message): void {
        const metaData = {
            process: this.wf.process?.name,
            activity: this.wf.activity?.name,
            activityType: this.wf.activity?.type,
            timestamp: Date.now()
        };

        const msg = {...message, ...metaData};

        this.wfMessage.emit(msg);
    }

    componentWillLoad(){
        this.initialize();

        if(this.process)
            this.load(this.process, this.activity, this.sessionId);
    }

    initialize(){
        if(!this.model)
            this.model = new ModelService();

        if(!this.http)
            this.http = new HttpService(this);

        if(!this.config)
            this.config = new ConfigService();

        if(!this.wf)
            this.wf = new WorkflowService(this);
        
        if(!this.validator)
            this.validator = new ValidatorService(this);
    }

    _render() {           
        for(let i = this.el.childNodes.length - 1; i >= 0; i--) 
            this.el.removeChild(this.el.childNodes[i]);

        this.controls.forEach(this.renderComponent.bind(this, this.el));
    }

    private renderComponent(parent: HTMLElement, control: Control) {
        let newEl: HTMLElement & Control;

        if(control.tag === "polaris-workflow") 
            newEl = this.createWorkflowElement(control); 
        else 
            newEl = this.createElement(control); 
        
        parent.appendChild(newEl);
        this.addErrorLabel(newEl);
    }

    private createWorkflowElement(control: Control): HTMLElement & Control{
        const el = document.createElement(control.tag) as HTMLPolarisWorkflowElement;
        const newEl = Object.assign(el, control);
        
        newEl.setServices(this.model, this.http, this.config, this.wf, this.validator);

        return newEl;
    }

    private createElement(control: Control): HTMLElement & Control {
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this  
        };

        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        
        this.bind(newEl);
        this.bindCaption(newEl, control);
        control.controls?.forEach(this.renderComponent.bind(this, newEl));
    
        return newEl;
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

    private bindCaption(newEl: HTMLElement, control: Control) {
        this.interpolate('caption', newEl, control);
        this.interpolate('textContent', newEl, control);
        this.interpolate('innerHTML', newEl, control);
    }

    private interpolate(prop: string, newEl: HTMLElement, control: Control) {
        if(!newEl[prop])
            return;

        newEl[prop] = this.model.getInterpolatedValue(control[prop]||newEl[prop]);
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