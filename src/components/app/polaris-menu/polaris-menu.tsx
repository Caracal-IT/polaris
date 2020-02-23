import { Component, Prop, State, Listen, h } from "@stencil/core";

@Component({
    tag: "polaris-menu",
    styleUrl: "polaris-menu.css",
    shadow: true
  })
  export class PolarisMenu {  
    @Prop() items: Array<string> = [];
    @State() process: string;
   
    @Listen('hashchange', {target:'window'})
    locationChangeHandler() {
        this.setActiveMenuItem();
    }

    @Listen('wfMessage', { target: 'document' })
    wfMessage(event: any){
      if(this.shouldChangeLocation(event))
        window.location.hash = event.detail.process;
    }

    componentWillLoad() {
        this.setActiveMenuItem();
    }

    render() {
        return this.items.map(i => <nav><a href={`#${i}`} class={this.process === i? 'active' : ''}>{i}</a></nav>);
    }

    private shouldChangeLocation(event: any): boolean{
        return event.detail.type 
        && event.detail.type === 'WORKFLOW_CHANGED' 
        && this.items.findIndex(i => i === event.detail.process) > -1;
    }

    private setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];  

        if(!this.process)
            window.location.hash = 'home';
    }
  }