export class PolarisWorkflow extends HTMLElement {
    static get observedAttributes() {
        return ['process'];
    }

    private _controls: Array<any> = [];
    
    get controls() {return this._controls};
    set controls(val) { 
        this._controls = val||[]; 
        this.render();
    }

    attributeChangedCallback(_attrName: string, _oldVal: string, _newVal: string) {
        console.log("%c Test", "color:green", _attrName);
    }

    private render() {
        for(let i = this.childNodes.length - 1; i >= 0; i--) 
            this.removeChild(this.childNodes[i]);

        this.controls.forEach(c => {
            const el = document.createElement(c.tag);
            const options = {
                "wf-Workflow": ""
            };
            const newEl = Object.assign(el, c, options);

            this.appendChild(newEl);
        });
    }
}

window.customElements.define('polaris-workflow', PolarisWorkflow);
