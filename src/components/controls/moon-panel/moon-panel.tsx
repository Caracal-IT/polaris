import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "moon-panel",
    shadow: true
  })
  export class MoonPanel {   
    @Prop() caption: string;

    render(){
        return <div>{this.caption}</div>
    }
  }