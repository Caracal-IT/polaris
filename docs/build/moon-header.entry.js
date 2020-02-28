import { r as registerInstance, h } from './core-cfeeaf49.js';

const MoonBLabel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("h1", null, this.caption);
    }
    static get style() { return "h1 {\n    color: var(--primary-border-color, purple);\n}"; }
};

export { MoonBLabel as moon_header };
