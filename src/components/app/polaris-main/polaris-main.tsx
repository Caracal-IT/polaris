import { Component, Element, Listen, h, Prop} from "@stencil/core";
import { Context } from "../../../model/context.model";

@Component({
    tag: "polaris-main",
    styleUrl: "polaris-main.css",
    shadow: false
  })
  export class PolarisMain {  
    @Element() el: HTMLPolarisMainElement;

    @Prop() ctx: Context;

    process: string;
    baseUrl: string;
    activity: string;
    sessionId: string;

    @Listen('hashchange', {target:'window'})
    locationChangeHandler() {        
        this.setProcess();
    }

    componentWillLoad() {
        this.baseUrl = this.ctx.config.getSetting("[baseUrl]");
        this.setProcess();
    }

    componentDidLoad(){
        const wf = this.el.querySelector("#mainWf") as HTMLPolarisWorkflowElement; 

        if(wf) 
            wf.setServices(this.ctx);
    }
    
    render() {
        return <div id="mainContent"><polaris-workflow parent={this.ctx} id="mainWf" process={this.process} activity={this.activity} sessionId={this.sessionId}></polaris-workflow></div>;
    }

    private setProcess() {            
        const params = window.location.hash.replace('#', '').split('-');
        if(this.process === params[0] || params[0] === "default")
            return;

        this.process = params[0];
        this.activity = params.length > 1 ? params[1] : 'start';
        this.sessionId = params.length > 2 ? params[2] : null;
        
        const wf = this.el.querySelector("#mainWf") as HTMLPolarisWorkflowElement;  
        if(wf)  
            wf.load(this.process, this.activity, this.sessionId);
                
        window.location.hash = this.process;
    }
  }