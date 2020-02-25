import { Component, Prop, Element, Watch, Method, Event, EventEmitter } from "@stencil/core";

import { Control } from "../../model/control.model";

import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { ConfigService } from "../../services/config.service";
import { WorkflowService } from "../../services/workflow.service";
import { ValidatorService } from "../../services/validator.service";
import { Message } from "../../model/message.model";
import { PageBuilder } from "../../utilities/page-builder";

@Component({
    tag: "polaris-workflow",
    shadow: false
  })
  export class PolarisWorkflow implements Control {    
    page = this;

    model: ModelService;
    http: HttpService;
    config: ConfigService;
    wf: WorkflowService;
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

        this.wfMessage.emit({...message, ...metaData});
    }

    componentWillLoad(){
        this.initialize();

        if(this.process)
            this.load(this.process, this.activity, this.sessionId);
    }

    initialize(){
        if(!this.model) this.model = new ModelService();
        if(!this.http) this.http = new HttpService(this);
        if(!this.config) this.config = new ConfigService();
        if(!this.wf) this.wf = new WorkflowService(this);
        if(!this.validator) this.validator = new ValidatorService(this);
    }

    onInput(newEl: HTMLElement & Control) {
        this.model.setValue(newEl.id, newEl.value);

        if(newEl.hasAttribute('error'))
            this.validator.validate();
    }

    _render() {   
        const builder = new PageBuilder(this);
        builder.build(this.el, this.onInput);
    }
  }