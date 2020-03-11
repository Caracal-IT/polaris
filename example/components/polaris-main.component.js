class PolarisMain extends HTMLElement {
    static get observedAttributes() { return ['caption']; }

    constructor() {
      super();

      this.shadow = this.attachShadow({mode: 'open'});
    }

    get ctx() { return this._ctx; }
    set ctx(value) { this._ctx = value; }

    get process() { return this._process; }
    set process(value) { this._process = value; }

    get baseUrl() { return this._baseUrl; }
    set baseUrl(value) { this._baseUrl = value; }

    get activity() { return this._activity; }
    set activity(value) { this._activity = value; }

    get sessionId() { return this._sessionId; }
    set sessionId(value) { this._sessionId = value; }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'process') this.wf.process = this.process;
        if(name === 'activity') this.wf.activity = this.activity;
        if(name === 'sessionId') this.wf.sessionId = this.sessionId;
    }

    connectedCallback() {
        this.baseUrl = this.ctx.config.getSetting("[baseUrl]");
        this._setProcess();

        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());

        this.wf.setServices(this.ctx);

        this.hashchange = this._setProcess.bind(this);

        window.addEventListener('hashchange', this.hashchange);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.hashchange);
    }


    _render() {
        const mainContent = document.createElement('div');
        mainContent.id = 'mainContent';

        this.wf = document.createElement('polaris-workflow');
        this.wf.id = 'mainWf';
        mainContent.appendChild(this.wf);

        this.wf.parent = this.ctx;
        this.wf.process = this.process;
        this.wf.activity = this.activity;
        this.wf.sessionId = this.sessionId;
        
        return mainContent;
    }

    _setProcess() {            
        const params = window.location.hash.replace('#', '').split('-');
        if(this.process === params[0] || params[0] === "default")
            return;

        this.process = params[0];
        this.activity = params.length > 1 ? params[1] : 'start';
        this.sessionId = params.length > 2 ? params[2] : null;
        
        if(this.wf)  
            this.wf.load(this.process, this.activity, this.sessionId);
                
        window.location.hash = this.process;
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            #mainContent {
                margin: 10px;
                max-width: 600px;
            }
            
            h1 {
                color: purple;
            }
            
            .text {
                margin: 5px;
                color: #757575;
            }
            
            .error {
                color: red;
            }
            
            .success {
                color: darkgreen;
                font-weight: bolder;
            }
            
            input {
                font-size: 1rem;
                padding: .8rem .8rem .8rem .4rem;
                margin: 5px 1px;
                display: block;
                width: 100%;
                border-radius: 10px;
                border: 1px solid #757575;
            }
            
            input:focus {
                outline: none;
                margin: 4px 0;
                border: 2px solid purple;
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
        `;

        return style;
    }
  }

  customElements.define('polaris-main', PolarisMain);