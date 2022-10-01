class MoonLabel extends HTMLElement {
    static get observedAttributes() { return ['caption', 'forInput']; }

    constructor() {
      super();

      this.shadow = this;
    }

    get caption() { return this._caption; }
    set caption(value) { this._caption = value; }

    get forInput() { return this._forInput; }
    set forInput(value) { this._forInput = value; }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'caption') {
            this.caption = newValue;

            if(this.button)
                this.header.textContent = value;
        }

        if(name === 'forInput') 
            this.htmlFor = newValue;
    }

    connectedCallback() {
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());
    }

    _render() {
        this.label = document.createElement('label');
        this.label.textContent = this.caption;
        this.label.htmlFor = this.forInput;

        return this.label;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            label {
                color: #757575;
            }
        `;

        return style;
    }
  }

  customElements.define('moon-label', MoonLabel);