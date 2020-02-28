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

    private _components: Array<any> = [];
    
    @Prop() parent: Context;

    @Prop() tag: string;
    @Prop() ctx: Context = this;
    @Prop() value?: any;  

    @Prop() url: string;
    @Prop() process: string|object;
    @Prop() activity: string;
    @Prop() sessionId: string;

    http = new HttpService(this.ctx);
    config = new ConfigService();
    model = new ModelService(this.ctx.config);
    wf = new WorkflowService(this.ctx);
    validator = new ValidatorService(this.ctx);
    
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
    async setServices(ctx: Context) {               
        this.model = ctx.model;
        this.http = ctx.http;
        this.config = ctx.config;        
        this.validator = ctx.validator;                
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

    componentWillLoad() { 
        if(this.parent)
            this.setServices(this.parent);

        if(this.url)
            this.config.addSetting("[baseUrl]", this.url);

        if(this.process)
            this.load(this.process, this.activity, this.sessionId);
    }

    onInput(newEl: HTMLElement & Control) {
        this.model.setValue(newEl.id, newEl.value);

        if(newEl.hasAttribute('error'))
            this.validator.validate();
    }

    _render() {   
        const builder = new PageBuilder(this);
        builder.build(this.el, this.onInput.bind(this));
    }
  }