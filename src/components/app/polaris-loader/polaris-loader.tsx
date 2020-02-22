import { Component, Listen, h, State } from "@stencil/core";

@Component({
    tag: "polaris-loader",
    styleUrl: "polaris-loader.css",
    shadow: true
  })
  export class PolarisLoader {  
    @State() className = 'hidden';

    @Listen('wfMessage', { target: 'document' })
    wfMessage(event: any){
        const msg = event.detail;

        switch (msg.messageType) {
          //case "ERROR": return showMessage(msg);
          //case "VALIDATION_ERROR": return showMessage(msg);
          case "START_LOADING": this.className = '';
          case "END_LOADING": this.className = 'hidden';
         // case "WORKFLOW_CHANGING": return showMessage(msg);
          //case "WORKFLOW_CHANGED": return showMessage(msg);
        }  
    }

    render() {
        return <div id="loadingPanel" class={this.className}></div>;
    }
  }