class PolarisLoader extends HTMLElement {
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

        this.wfMessage = this._wfMessage.bind(this);
        document.addEventListener('wfMessage', this.wfMessage);
    }
    
    disconnectedCallback() {
        document.removeEventListener('wfMessage', this.wfMessage);
    }

    _wfMessage(event){
        const msg = event.detail;

        switch (msg.type) {
          case "ERROR": return this._showMessage(msg);
          case "START_LOADING": this._show(true); break;
          case "END_LOADING": this._show(false); break;
        } 
    }

    _showMessage(msg){
        alert(msg.description||msg.metadata.error.error.message);
    }
  
    _show(isVisible) {
        this.showLoader = isVisible;
  
        setTimeout(() => this.loadingPanel.hidden = !this.showLoader, 300);
    }

    _render() {
        this.loadingPanel = document.createElement('div');
        this.loadingPanel.id = 'loadingPanel';

        return this.loadingPanel;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            div {      
                position: fixed;
                left: 0;
                top: 0;
                min-width: 100vw;
                min-height: 100vh;
                z-index: 99999999;
                background: rgba(0, 0, 0, 0.611);
            }
            
            div::after { 
                content: "Loading...";
                position: absolute;
                display: block;      
                background-color: white;      
                width: 6rem;
                height: 1.5rem;
                line-height: 1.5rem;
                text-align: center;
                font-weight: bolder;
                font-size: 1.2rem;
                color: blueviolet;
                border: 1px solid black;
                border-radius: 5px;
            
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        `;

        return style;
    }
  }

  customElements.define('polaris-loader', PolarisLoader);