import { r as registerInstance, h } from './core-cda6bd5a.js';

const PolarisMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.items = [];
    }
    locationChangeHandler() {
        this.setActiveMenuItem();
    }
    wfMessage(event) {
        if (this.shouldChangeLocation(event))
            window.location.hash = event.detail.process;
    }
    componentWillLoad() {
        this.setActiveMenuItem();
    }
    render() {
        if (typeof this.items === "string")
            return this.ctx
                .model
                .getValue(this.items)
                .map((i) => h("nav", null, h("a", { href: `#${i.process}`, class: this.process === i.process ? 'active' : '' }, i.name)));
        else if (typeof this.items === "object")
            return this.items.map(i => h("nav", null, h("a", { href: `#${i.process}`, class: this.process === i.process ? 'active' : '' }, i.name)));
    }
    shouldChangeLocation(event) {
        var _a, _b;
        return event.detail.type
            && event.detail.type === 'PROCESS_CHANGED'
            && event.detail.process !== "default"
            && ((_b = (_a = event.detail.metadata) === null || _a === void 0 ? void 0 : _a.stack) === null || _b === void 0 ? void 0 : _b.length) === 0;
    }
    setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];
        if (!this.process)
            window.location.hash = 'home';
    }
    static get style() { return ":host {\n    border-right: 1px solid #757575;\n}\n\na{\n    display: block;\n    line-height: 2;\n    padding: 0 5px;\n    width: calc(100% - 20px);\n    border-radius: 10px;\n    text-transform: capitalize;\n}\n\na:visited,\na:link {\n    margin: 0 5px;\n    cursor: pointer;\n    color: #757575;\n    text-decoration: none;\n}\n\na:active,\na:hover {\n    margin: 0 5px;\n    cursor: pointer;\n    color: purple;\n    text-decoration: underline;\n}\n\na.active {\n    color: purple;\n    background-color: rgb(238, 177, 238);\n}"; }
};

export { PolarisMenu as polaris_menu };
