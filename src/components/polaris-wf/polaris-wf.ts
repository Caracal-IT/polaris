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

export class PolarisWF extends HTMLElement implements Control {
    static get observedAttributes() { return ['process', 'url']; }

    private _components: Array<any> = [];
    private _loader: WorkflowLoader;
    
    parent: Context;

    tag: string;
    page: Page = this;
    ctx: Context = this;
    value?: any;  

    url: string;
    process: string|object;
    activity: string;
    sessionId: string;

    get controls(){return this._components; }
    set controls(val: any) { 
        this._components = val; 
        this.render(); 
    }

    http = new HttpService(this.ctx);
    config = new ConfigService();
    model = new ModelService(this.ctx.config);
    wf = new WorkflowService(this.ctx);
    validator = new ValidatorService();

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if(name === 'url') 
            this.url = newValue;
        else if(name === 'process') {
           this.process = newValue;
           this.load(this.process, this.activity, this.sessionId);
        }
    }

    async connectedCallback() { 
        if(this.url) {
            this.config.addSetting("[settingsUrl]", this.url);
            const settings = await this.http.fetch({method: "GET", url: this.url});
            Object.keys(settings).forEach(k => this.config.addSetting(k, settings[k]))
        }

        if(!this._loader) {
            this._loader = new HttpWorkflowLoader(this.http);
            this.wf.loader = this._loader;
        }

        if(this.parent)
            this.setServices(this.parent);
    
        if(this.process)
            this.load(this.process, this.activity, this.sessionId);
    }

    setServices(ctx: Context) {             
        this.model = ctx.model;
        this.http = ctx.http;
        this.config = ctx.config;        
        this.validator = ctx.validator; 
    }

    async load(process: any, next = "start", sessionId = '') {
        if(sessionId && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        
        await this.wf.setProcess(process, next);       
    }

    addActivity(activity: Activity){
        ActivityFactory.add(activity);
    }

    addValidator(validator: Validator) {
        this.validator.addValidator(validator);
    }

    sendMessage(message: Message): void {
        const metaData = {
            process: this.wf.process?.name,
            activity: this.wf.activity?.name,
            activityType: this.wf.activity?.type,
            timestamp: Date.now()
        };

        document.dispatchEvent(new CustomEvent('wfMessage', {bubbles: true, detail: {...message, ...metaData}}));
    }

    onInput(newEl: HTMLElement & Control) {
        this.model.setValue(newEl.id, newEl.value);

        if(newEl.hasAttribute('error'))
            this.validator.validate(this);
    }

    render() {   
        const builder = new PageBuilder(this);
        builder.build(this, this.onInput.bind(this));
    }
}

customElements.define('polaris-wf', PolarisWF);