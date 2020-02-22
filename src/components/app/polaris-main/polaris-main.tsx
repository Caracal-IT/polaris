import { Component, h, Listen, State } from "@stencil/core";

@Component({
    tag: "polaris-main",
    styleUrl: "polaris-main.css",
    shadow: true
  })
  export class PolarisMain {  
    @State() process: string;
    @State() activity: string
    @State() sessionId: string|null|undefined
   
    @Listen('hashchange', {target:'window'})
    locationChangeHandler() {
        this.setProcess();
    }

    componentWillLoad() {
        this.setProcess();
    }

    render() {
        return <polaris-workflow process={this.process} activity={this.activity} sessionId={this.sessionId}></polaris-workflow>;
    }

    private setProcess() {
        const params = window.location.hash.replace('#', '').split('-');
    
        if(this.process === params[0])
            return;

        this.activity = params.length > 1 ? params[1] : 'start';
        this.sessionId = params.length > 2 ? params[2] : null;
        this.process = params[0]; 

        window.location.hash = this.process;
    }
  }