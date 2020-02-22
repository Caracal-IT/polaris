import { r as registerInstance, h } from './core-0e88e524.js';

const PolarisMain = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    locationChangeHandler() {
        this.setProcess();
    }
    componentWillLoad() {
        this.setProcess();
    }
    render() {
        return h("polaris-workflow", { process: this.process, activity: this.activity, sessionId: this.sessionId });
    }
    setProcess() {
        const params = window.location.hash.replace('#', '').split('-');
        if (this.process === params[0])
            return;
        this.activity = params.length > 1 ? params[1] : 'start';
        this.sessionId = params.length > 2 ? params[2] : null;
        this.process = params[0];
        window.location.hash = this.process;
    }
    static get style() { return ":host {\n   margin: 10px;\n   max-width: 600px;\n}\n\nh1 {\n    color: purple;\n}\n\n.text {\n    margin: 5px;\n    color: #757575;\n}\n\n.error {\n    color: red;\n}\n\n.success {\n    color: darkgreen;\n    font-weight: bolder;\n}\n\ninput {\n    font-size: 1rem;\n    padding: .8rem .8rem .8rem .4rem;\n    margin: 5px 1px;\n    display: block;\n    width: 100%;\n    border-radius: 10px;\n    border: 1px solid var(--primary-border-color, #757575);\n}\n\ninput:focus {\n    outline: none;\n    margin: 4px 0;\n    border: 2px solid var(--primary-border-color, purple);\n}\n\ninput[error=\"true\"]{\n    margin: 4px 0;\n    background-color: lightpink;\n    border: 2px solid red;\n}\n\n[wf-error] {\n    color: red;\n    font-weight: bolder;\n}"; }
};

export { PolarisMain as polaris_main };
