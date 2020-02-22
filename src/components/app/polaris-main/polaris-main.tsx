import { Component, Element, Listen, h} from "@stencil/core";

@Component({
    tag: "polaris-main",
    styleUrl: "polaris-main.css",
    shadow: true
  })
  export class PolarisMain {  
    @Element() el: HTMLPolarisMainElement;

    process: string;
    activity: string;
    sessionId: string;

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

        this.process = params[0];
        this.activity = params.length > 1 ? params[1] : 'start';
        this.sessionId = params.length > 2 ? params[2] : null;
         
        const wf = this.el.shadowRoot.querySelector("polaris-workflow");
        if(wf)
            wf.load(this.process, this.activity, this.sessionId);

        window.location.hash = this.process;
    }
  }