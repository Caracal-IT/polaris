class MoonHeader extends HTMLElement {
    static get observedAttributes() { return ['caption']; }

    constructor() {
      super();

      this.shadow = this.attachShadow({mode: 'open'});
    }

    get caption() { return this._caption; }
    set caption(value) { this._caption = value; }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'caption') {
            this.caption = newValue;

            if(this.button)
                this.header.textContent = value;
        }
    }

    connectedCallback() {
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());
    }

    

    _render() {
        this.header = document.createElement('h1');
        this.header.textContent = this.caption;

        return this.header;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            h1 {
                color: purple;
            }
        `;

        return style;
    }
  }

  customElements.define('moon-header', MoonHeader);