import { r as registerInstance, h } from './core-59ffa22c.js';

const MoonPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("div", null, this.caption);
    }
};

export { MoonPanel as moon_panel };
