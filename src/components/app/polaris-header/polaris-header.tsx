import { Component, h } from "@stencil/core";

@Component({
    tag: "polaris-header",
    styleUrl: "polaris-header.css",
    shadow: true
  })
  export class PolarisHeader {  
   
    render() {
        return <header><h1>Polaris Workflow</h1></header>;
    }
  }