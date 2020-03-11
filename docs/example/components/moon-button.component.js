class MoonButton extends HTMLElement {
    static get observedAttributes() { return ['caption']; }

    constructor() {
      super();

      this.shadow = this.attachShadow({mode: 'open'});
    }

    get caption() { return this._caption; }
    set caption(value) { this._caption = value; }

    get ctx() { return this._ctx; }
    set ctx(value) { this._ctx = value; }

    get next() { return this._next; }
    set next(value) { this._next = value; }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'caption') {
            this.caption = newValue;

            if(this.button)
                this.button.textContent = value;
        }
    }

    connectedCallback() {
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());
    }

    disconnectedCallback() {
        this.button.removeEventListener('click', this.btnClick);
    }

    _buttonHandler() {
        this.ctx.wf.goto(this.next);
    }

    _render() {
        this.button = document.createElement('button');
        this.btnClick = this._buttonHandler.bind(this);

        this.button.addEventListener('click', this.btnClick);
        this.button.textContent = this.caption;

        return this.button;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            button {
                cursor: pointer;
                color: var(--primary-color, white);
                background-color: purple;
            
                min-width: 9rem;
                
                border: 1px solid #757575;
                border-radius: 5px;
                
                padding: .5rem;
                margin: 0 .1rem;
            
                font: inherit;
                font-size: 1rem;
            }
            
            button:hover {
                color: var(--primary-alt-color, black);
                background-color: plum;
                box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);
            }
            
            button:active:hover {
                box-shadow: 1px 2px 2px rgba(0, 0, 0, .5);
            }
            
            button:focus {
                outline: none;
                box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);
            }
        `;

        return style;
    }
  }

  customElements.define('moon-button', MoonButton);