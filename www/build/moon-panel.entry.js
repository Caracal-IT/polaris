import { r as registerInstance, c as getElement } from './core-68ff5f14.js';

const MoonPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const header = document.createElement('h1');
        this.el.shadowRoot.appendChild(header);
        header.textContent = this.caption;
        Array.from(this.el.childNodes)
            .forEach(e => this.el.shadowRoot.appendChild(e));
    }
    get el() { return getElement(this); }
    static get style() { return ""; }
};

export { MoonPanel as moon_panel };
