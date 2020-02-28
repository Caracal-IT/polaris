import { Component, Listen, h, State } from "@stencil/core";

@Component({
    tag: "polaris-loader",
    styleUrl: "polaris-loader.css",
    shadow: true
  })
  export class PolarisLoader {  
    @State() isVisible = false;
    showLoader: boolean = false;

    @Listen('wfMessage', { target: 'document' })
    wfMessage(event: any){
        const msg = event.detail;

        switch (msg.type) {
          //case "ERROR": return showMessage(msg);
          //case "VALIDATION_ERROR": return showMessage(msg);
          case "START_LOADING": this.show(true); break;
          case "END_LOADING": this.show(false); break;
         // case "WORKFLOW_CHANGING": return showMessage(msg);
          //case "WORKFLOW_CHANGED": return showMessage(msg);
        } 
    }

    show(isVisible: boolean) {
      this.showLoader = isVisible;

      setTimeout(() => this.isVisible = this.showLoader, 200);
    }

    render() {
        if(this.isVisible)
            return <div id="loadingPanel"></div>;
    }
  }