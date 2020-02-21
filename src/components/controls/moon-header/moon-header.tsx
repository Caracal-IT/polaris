import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "moon-header",
    styleUrl: "moon-header.css",
    shadow: true
  })
  export class MoonBLabel {  
    @Prop() caption: string;
    
    render() {
        return <h1>{this.caption}</h1>
    }
  }