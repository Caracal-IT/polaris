import { Component, Prop, State, Listen, h } from "@stencil/core";
import { Context } from "../../../model/context.model";
import { MenuItem } from "../../../model/menu-item.model";

@Component({
    tag: "polaris-menu",
    styleUrl: "polaris-menu.css",
    shadow: true
  })
  export class PolarisMenu {  
    @Prop() items: Array<MenuItem>|string = [];
    @State() process: string;

    @Prop() ctx?: Context;
   
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
        if(typeof this.items === "string") 
            return this.ctx
                       .model
                       .getValue(this.items)
                       .map((i:MenuItem) => <nav><a href={`#${i.process}`} class={this.process === i.process? 'active' : ''}>{i.name}</a></nav>);
                
        else if(typeof this.items === "object")
            return this.items.map(i => <nav><a href={`#${i.process}`} class={this.process === i.process? 'active' : ''}>{i.name}</a></nav>);
    }

    private shouldChangeLocation(event: any): boolean{
        return event.detail.type 
        && event.detail.type === 'PROCESS_CHANGED' 
        && event.detail.process !== "default"
        && event.detail.metadata?.stack?.length === 0;
    }

    private setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];  

        if(!this.process)
            window.location.hash = 'home';
    }
  }