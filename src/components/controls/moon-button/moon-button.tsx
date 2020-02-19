import { Component, Prop, h } from "@stencil/core";
import { Context } from "../../../model/context.model";

@Component({
    tag: "moon-button",
    styleUrl: "moon-button.css",
    shadow: true
  })
  export class MoonButton {  
    @Prop()ctx: Context;

    @Prop() caption: string;
    @Prop() next: string;

    buttonHandler() {
        this.ctx?.wf?.goto(this.next);
    }

    render() {
        return <button onClick={this.buttonHandler.bind(this)}>{this.caption}</button>
    }
  }