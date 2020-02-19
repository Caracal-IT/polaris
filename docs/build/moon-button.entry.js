import { r as registerInstance, h } from './core-68ff5f14.js';

const MoonButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    buttonHandler() {
        var _a, _b;
        (_b = (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.wf) === null || _b === void 0 ? void 0 : _b.goto(this.next);
    }
    render() {
        return h("button", { onClick: this.buttonHandler.bind(this) }, this.caption);
    }
    static get style() { return ""; }
};

export { MoonButton as moon_button };
