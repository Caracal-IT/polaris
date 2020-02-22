import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "polaris-app",
    styleUrl: "polaris-app.css",
    shadow: true
  })
  export class PolarisApp {  
   
    render() {
        return <Host>
            <polaris-header></polaris-header>
            <div>
                <polaris-menu></polaris-menu>
                <polaris-main></polaris-main>
            </div>
        </Host>;
    }
  }