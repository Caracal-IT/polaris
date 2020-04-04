export class PolarisWF extends HTMLElement{
    constructor() {
        super();

        this.innerHTML = '<h2>Hallo World</h2>';
        console.log("Testing");
    }

}

customElements.define('polaris-wf', PolarisWF);