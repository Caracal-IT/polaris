import { r as registerInstance, h } from './core-0e88e524.js';

const PolarisHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("header", null, h("h1", null, "Polaris Workflow"));
    }
    static get style() { return "h1 {\n    color: purple;\n}"; }
};

export { PolarisHeader as polaris_header };
