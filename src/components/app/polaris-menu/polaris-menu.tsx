import { Component, State, Listen, Host, h } from "@stencil/core";

@Component({
    tag: "polaris-menu",
    styleUrl: "polaris-menu.css",
    shadow: true
  })
  export class PolarisMenu {  
    @State() process: string;
   
    @Listen('hashchange', {target:'window'})
    locationChangeHandler() {
        this.setActiveMenuItem();
    }

    componentWillLoad() {
        this.setActiveMenuItem();
    }

    render() {
        return <Host>
            <nav><a href="#registration" class={this.process === 'registration'? 'active' : ''}>Registration</a></nav>
            <nav><a href="#deposit" class={this.process === 'deposit'? 'active' : ''}>Deposit</a></nav>
        </Host>;
    }

    private setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];  

        if(!this.process)
            window.location.hash = 'registration';
    }
  }