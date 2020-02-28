import { r as registerInstance, h } from './core-cfeeaf49.js';

const MoonBLabel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("span", null, this.caption);
    }
    static get style() { return ""; }
};

export { MoonBLabel as moon_label };
