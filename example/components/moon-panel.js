class MoonPanel extends HTMLElement {
    static get observedAttributes() { return ['caption']; }

    constructor() {
      super();

      this.shadow = this.attachShadow({mode: 'open'});
    }

    get caption() { return this._caption; }
    set caption(value) { this._caption = value; }

    attributeChangedCallback(name, oldValue, newValue) {
        connectedCallback();
    }

    connectedCallback() {
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());
    }

    _render() {
        const container = document.createElement('div');
        const header = document.createElement('h1');
        container.appendChild(header);
        header.textContent = this.caption;

        Array.from(this.childNodes)
            .forEach(e => container.appendChild(e));
    
        return container;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                box-sizing: border-box;
            }
            
            div {
                display: flex; 
                flex-direction: column;
                width: 600px;
                border: 1px solid black;
                border-radius: 15px;
                border: 2px solid var(--primary-border-color, #757575);
                box-shadow: 3px 4px 3px rgba(0, 0, 0, .3);
                padding: 5px;
            }
            
            h1 {
                color: var(--primary-border-color, purple);
            }
            
            
            input {
                font-size: 1rem;
                padding: .8rem .8rem .8rem .4rem;
                margin: 5px 1px;
                display: block;
                width: 100%;
                border-radius: 10px;
                border: 1px solid var(--primary-border-color, #757575);
            }
            
            input:focus {
                outline: none;
                margin: 4px 0;
                border: 2px solid var(--primary-border-color, purple);
            }
            
            input[error="true"]{
                margin: 4px 0;
                background-color: lightpink;
                border: 2px solid red;
            }
            
            [wf-error] {
                color: red;
                font-weight: bolder;
            }
            
            moon-button {
                align-self: flex-end;
            }
        `;

        return style;
    }
  }

  customElements.define('moon-panel', MoonPanel);