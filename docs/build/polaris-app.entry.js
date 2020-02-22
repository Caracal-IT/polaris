import { r as registerInstance, h, H as Host } from './core-0e88e524.js';

const PolarisApp = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h(Host, null, h("polaris-header", null), h("div", null, h("polaris-menu", null), h("polaris-main", null)));
    }
    static get style() { return "* {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n:host {\n    display:-ms-flexbox;\n    display:flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100vh;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n}\n\ndiv {\n    display: -ms-flexbox;\n    display: flex;\n    height: 100%;\n}\n\npolaris-header {\n    -ms-flex: 0 0 50px;\n    flex: 0 0 50px;\n}\n\npolaris-menu {\n    -ms-flex: 0 0 150px;\n    flex: 0 0 150px;\n}\n\npolaris-main {\n    -ms-flex: 1;\n    flex: 1;\n}"; }
};

export { PolarisApp as polaris_app };
