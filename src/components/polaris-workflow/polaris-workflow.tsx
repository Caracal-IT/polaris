import { Component, Prop, Element, Watch, Method, Event, EventEmitter } from "@stencil/core";

import { Control } from "../../model/control.model";

import { Page } from "../../model/page.model";
import { Context } from "../../model/context.model";
import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { ConfigService } from "../../services/config.service";
import { WorkflowService } from "../../services/workflow.service";
import { ValidatorService } from "../../services/validator.service";
import { Message } from "../../model/message.model";
import { PageBuilder } from "../../utilities/page-builder.utility";
import { WorkflowLoader, HttpWorkflowLoader } from "../../utilities/workflow-loader.utility";
import { Activity } from "../../activities/activity";
import { ActivityFactory } from "../../activities/activity-factory";
import { Validator } from "../../validators/validator";
import { Process } from "../../model/process.model";

@Component({
    tag: "polaris-workflow",
    shadow: false
  })
  export class PolarisWorkflow implements Control {    
    private _components: Control[] = [];
    private _loader: WorkflowLoader;
    private _isConnected: boolean;
    
    @Prop() parent: Context;

    @Prop() tag: string;
    @Prop() page: Page = this;
    @Prop() ctx: Context = this;
    @Prop() value?: string|object|null|undefined;  

    @Prop() url: string;
    @Prop() process: string|Process;
    @Prop() activity: string;
    @Prop() sessionId: string;

    http: HttpService = new HttpService(this.ctx);
    config: ConfigService = new ConfigService();
    model: ModelService = new ModelService(this.ctx.config);
    wf: WorkflowService = new WorkflowService(this.ctx);
    validator: ValidatorService = new ValidatorService();
    
    @Element() el: HTMLElement;
    
    @Watch("process")
    async processChangeHandler() {        
        await this.load(this.process, this.activity, this.sessionId);
    }

    @Event()
    wfMessage: EventEmitter;

    get controls(){return this._components; }
    set controls(val: Control[]) { 
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
    async load(process: string | Process, next: string = "start", sessionId: string = ''): Promise<void> {
        if(sessionId != null && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        
        await this.wf.setProcess(process, next);       
    }

    @Method()
    async addActivity(activity: Activity, replace: boolean = false): Promise<void> {
        ActivityFactory.add(activity, replace);

        return Promise.resolve();
    }

    @Method()
    async addValidator(validator: Validator) {
        this.validator.addValidator(validator);
    }

    sendMessage(message: Message): void {
        const metaData = {
            process: this.wf.process?.name,
            activity: this.wf.activity?.name,
            activityType: this.wf.activity?.type,
            timestamp: Date.now()
        };

        if(this._isConnected === true) 
            this.wfMessage.emit({...message, ...metaData});
    }

    disconnectedCallback() {
        this._isConnected = false;
    }

    connectedCallback() {
        this._isConnected = true;
    }

    async componentWillLoad() { 
        if(this.url != null) {
            this.config.addSetting("[settingsUrl]", this.url);
            const settings = await this.http.fetch({method: "GET", url: this.url});
            Object.keys(settings).forEach(k => this.config.addSetting(k, settings[k]));
        }

        if(this._loader === null || this._loader === undefined) {
            this._loader = new HttpWorkflowLoader(this.http);
            this.wf.loader = this._loader;
        }

        if(this.parent != null)
            await this.setServices(this.parent);
        
        if(this.process != null)
            await this.load(this.process, this.activity, this.sessionId);
    }

    private onInput(newEl: HTMLElement & Control) {
        this.model.setValue(newEl.id, newEl.value);

        if(newEl.hasAttribute('error'))
            this.validator.validate(this);
    }

    private _render() {   
        const builder = new PageBuilder(this);
        builder.build(this.el, this.onInput.bind(this));
    }
  }