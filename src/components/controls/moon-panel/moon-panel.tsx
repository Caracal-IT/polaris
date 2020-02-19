import { Component, Prop, Element } from "@stencil/core";

@Component({
    tag: "moon-panel",
    styleUrl: "moon-panel.css",
    shadow: true
  })
  export class MoonPanel {   
    @Prop() caption: string;
    @Element() el: HTMLElement;

    render() {
        const header = document.createElement('h1');
        this.el.shadowRoot.appendChild(header);
        header.textContent = this.caption;
 
        Array.from(this.el.childNodes)
             .forEach(e => this.el.shadowRoot.appendChild(e))
    }
  }