import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "moon-label",
    styleUrl: "moon-label.css",
    shadow: true
  })
  export class MoonBLabel {  
    @Prop() caption: string;
    
    render() {
        return <span>{this.caption}</span>
    }
  }