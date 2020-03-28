class PolarisReact extends HTMLElement {    
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.components = {
            "ProcessButton": ProcessButton,
        };
    }

    connectedCallback() {
        const Component = this.components[this.component];
        ReactDOM.render(React.createElement(Component, this), this.shadowRoot);        
    }
}

customElements.define('polaris-react', PolarisReact);