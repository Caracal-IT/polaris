import { r as registerInstance, h, H as Host } from './core-0e88e524.js';

const PolarisMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    locationChangeHandler() {
        this.setActiveMenuItem();
    }
    componentWillLoad() {
        this.setActiveMenuItem();
    }
    render() {
        return h(Host, null, h("nav", null, h("a", { href: "#registration", class: this.process === 'registration' ? 'active' : '' }, "Registration")), h("nav", null, h("a", { href: "#deposit", class: this.process === 'deposit' ? 'active' : '' }, "Deposit")));
    }
    setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];
        if (!this.process)
            window.location.hash = 'registration';
    }
    static get style() { return ":host {\n    border-right: 1px solid #757575;\n}\n\na{\n    display: block;\n    line-height: 2;\n    padding: 0 5px;\n    width: calc(100% - 20px);\n    border-radius: 10px;\n}\n\na:visited,\na:link {\n    margin: 0 5px;\n    cursor: pointer;\n    color: #757575;\n    text-decoration: none;\n}\n\na:active,\na:hover {\n    margin: 0 5px;\n    cursor: pointer;\n    color: purple;\n    text-decoration: underline;\n}\n\na.active {\n    color: purple;\n    background-color: rgb(238, 177, 238);\n}"; }
};

export { PolarisMenu as polaris_menu };
