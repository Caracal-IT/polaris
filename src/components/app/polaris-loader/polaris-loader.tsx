import { Component, Listen, h, State } from "@stencil/core";

@Component({
    tag: "polaris-loader",
    styleUrl: "polaris-loader.css",
    shadow: true
  })
  export class PolarisLoader {  
    @State() isVisible = false;

    @Listen('wfMessage', { target: 'document' })
    wfMessage(event: any){
        const msg = event.detail;
console.log("LOADER", event);
        switch (msg.type) {
          //case "ERROR": return showMessage(msg);
          //case "VALIDATION_ERROR": return showMessage(msg);
          case "START_LOADING": this.isVisible = true; break;
          case "END_LOADING": this.isVisible = false; break;
         // case "WORKFLOW_CHANGING": return showMessage(msg);
          //case "WORKFLOW_CHANGED": return showMessage(msg);
        } 
    }

    render() {
        if(this.isVisible)
            return <div id="loadingPanel"></div>;
    }
  }