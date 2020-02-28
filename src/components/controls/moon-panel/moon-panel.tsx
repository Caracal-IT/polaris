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
        if(this.el.shadowRoot.prepend) {
            const header = document.createElement('h1');
            this.el.shadowRoot.prepend(header);
            header.textContent = this.caption;
 
          Array.from(this.el.childNodes)
               .forEach(e => this.el.shadowRoot.appendChild(e));
        }
        else {
          const header = document.createElement('h1');
          this.el.shadowRoot.insertBefore(header, this.el.shadowRoot.firstChild);
          header.textContent = this.caption;
        }
    }
  }