import { r as registerInstance, c as getElement } from './core-f8096cc4.js';

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
    static get style() { return "* {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n:host {\n    display: -ms-flexbox;\n    display: flex; \n    -ms-flex-direction: column; \n    flex-direction: column;\n    width: 600px;\n    border: 1px solid black;\n    border-radius: 15px;\n    border: 2px solid var(--primary-border-color, #757575);\n    -webkit-box-shadow: 3px 4px 3px rgba(0, 0, 0, .3);\n    box-shadow: 3px 4px 3px rgba(0, 0, 0, .3);\n    padding: 5px;\n}\n\nh1 {\n    color: var(--primary-border-color, purple);\n}\n\n\ninput {\n    font-size: 1rem;\n    padding: .8rem .8rem .8rem .4rem;\n    margin: 5px 1px;\n    display: block;\n    width: 100%;\n    border-radius: 10px;\n    border: 1px solid var(--primary-border-color, #757575);\n}\n  \ninput:focus {\n    outline: none;\n    margin: 4px 0;\n    border: 2px solid var(--primary-border-color, purple);\n}\n\nmoon-button {\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n}"; }
};

export { MoonPanel as moon_panel };
