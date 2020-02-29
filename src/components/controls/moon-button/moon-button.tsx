import { Component, Prop, h } from "@stencil/core";
import { Context } from "../../../model/context.model";

 /**
  * @name MoonButton
  * @component Polaris
  * @description The button on the forms.
  * @author aaaa
  * @copyright bbbb
  * @default 3ed3ed
  * @property deed
  * @example eeeeee
  * @package dddddd
  * @summary eeeeeeeeee
 */
@Component({
    tag: "moon-button",
    styleUrl: "moon-button.css",
    shadow: true
  })
  export class MoonButton {  
    /**
     * The current context.
     */
    @Prop()ctx: Context;

    /**  
     *  The button text.
    */
    @Prop() caption: string;
    /**
     * The next activity to execute.
     */
    @Prop() next: string;

    buttonHandler() {
        this.ctx?.wf?.goto(this.next);
    }

    render() {
        return <button onClick={this.buttonHandler.bind(this)}>{this.caption}</button>
    }
  }