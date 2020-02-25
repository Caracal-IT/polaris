import { r as registerInstance, h } from './core-cda6bd5a.js';

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
    static get style() { return "button {\n    cursor: pointer;\n    color: var(--primary-color, white);\n    background-color: var(--primary-bg-color, purple);\n\n    min-width: 9rem;\n    \n    border: 1px solid var(--primary-border-color, #757575);\n    border-radius: 5px;\n    \n    padding: .5rem;\n    margin: 0 .1rem;\n\n    font: inherit;\n    font-size: 1rem;\n}\n\nbutton:hover {\n    color: var(--primary-alt-color, black);\n    background-color: var(--primary-alt-bg-color, plum);\n    -webkit-box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);\n    box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);\n}\n\nbutton:active:hover {\n    -webkit-box-shadow: 1px 2px 2px rgba(0, 0, 0, .5);\n    box-shadow: 1px 2px 2px rgba(0, 0, 0, .5);\n}\n\nbutton:focus {\n    outline: none;\n    -webkit-box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);\n    box-shadow: 3px 4px 4px rgba(0, 0, 0, .5);\n}"; }
};

export { MoonButton as moon_button };
