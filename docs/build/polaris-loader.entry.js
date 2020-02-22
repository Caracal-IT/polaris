import { r as registerInstance, h } from './core-0e88e524.js';

const PolarisLoader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.className = 'hidden';
    }
    wfMessage(event) {
        const msg = event.detail;
        switch (msg.messageType) {
            //case "ERROR": return showMessage(msg);
            //case "VALIDATION_ERROR": return showMessage(msg);
            case "START_LOADING": this.className = '';
            case "END_LOADING": this.className = 'hidden';
            // case "WORKFLOW_CHANGING": return showMessage(msg);
            //case "WORKFLOW_CHANGED": return showMessage(msg);
        }
    }
    render() {
        return h("div", { id: "loadingPanel", class: this.className });
    }
    static get style() { return "div {      \n    position: fixed;\n    left: 0;\n    top: 0;\n    min-width: 100vw;\n    min-height: 100vh;\n    z-index: 99999999;\n    background: rgba(0, 0, 0, 0.611);\n  }\n\n  div::after { \n    content: \"Loading...\";\n    position: absolute;\n    display: block;      \n    background-color: white;      \n    width: 6rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    text-align: center;\n    font-weight: bolder;\n    font-size: 1.2rem;\n    color: blueviolet;\n    border: 1px solid black;\n    border-radius: 5px;\n\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n\n  .hidden {\n    display: none;\n  }"; }
};

export { PolarisLoader as polaris_loader };
