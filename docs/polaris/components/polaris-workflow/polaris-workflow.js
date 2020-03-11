import { HttpService } from "../../services/http.service";
import { ModelService } from "../../services/model.service";
import { ConfigService } from "../../services/config.service";
import { WorkflowService } from "../../services/workflow.service";
import { ValidatorService } from "../../services/validator.service";
import { PageBuilder } from "../../utilities/page-builder.utility";
import { HttpWorkflowLoader } from "../../utilities/workflow-loader.utility";
import { ActivityFactory } from "../../activities/activity-factory";
export class PolarisWorkflow {
    constructor() {
        this.page = this;
        this._components = [];
        this.ctx = this;
        this.http = new HttpService(this.ctx);
        this.config = new ConfigService();
        this.model = new ModelService(this.ctx.config);
        this.wf = new WorkflowService(this.ctx);
        this.validator = new ValidatorService();
    }
    processChangeHandler() {
        this.load(this.process, this.activity, this.sessionId);
    }
    get controls() { return this._components; }
    set controls(val) {
        this._components = val;
        this._render();
    }
    async setServices(ctx) {
        this.model = ctx.model;
        this.http = ctx.http;
        this.config = ctx.config;
        this.validator = ctx.validator;
    }
    async load(process, next = "start", sessionId = '') {
        if (sessionId && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        await this.wf.setProcess(process, next);
    }
    async addActivity(activity) {
        ActivityFactory.add(activity);
    }
    async addValidator(validator) {
        this.validator.addValidator(validator);
    }
    sendMessage(message) {
        var _a, _b, _c;
        const metaData = {
            process: (_a = this.wf.process) === null || _a === void 0 ? void 0 : _a.name,
            activity: (_b = this.wf.activity) === null || _b === void 0 ? void 0 : _b.name,
            activityType: (_c = this.wf.activity) === null || _c === void 0 ? void 0 : _c.type,
            timestamp: Date.now()
        };
        this.wfMessage.emit(Object.assign(Object.assign({}, message), metaData));
    }
    async componentWillLoad() {
        if (this.url) {
            this.config.addSetting("[settingsUrl]", this.url);
            const settings = await this.http.fetch({ method: "GET", url: this.url });
            Object.keys(settings).forEach(k => this.config.addSetting(k, settings[k]));
        }
        if (!this._loader) {
            this._loader = new HttpWorkflowLoader(this.http);
            this.wf.loader = this._loader;
        }
        if (this.parent)
            this.setServices(this.parent);
        if (this.process)
            this.load(this.process, this.activity, this.sessionId);
    }
    onInput(newEl) {
        this.model.setValue(newEl.id, newEl.value);
        if (newEl.hasAttribute('error'))
            this.validator.validate(this);
    }
    _render() {
        const builder = new PageBuilder(this);
        builder.build(this.el, this.onInput.bind(this));
    }
    static get is() { return "polaris-workflow"; }
    static get properties() { return {
        "parent": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Context",
                "resolved": "Context",
                "references": {
                    "Context": {
                        "location": "import",
                        "path": "../../model/context.model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "tag": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tag",
            "reflect": false
        },
        "ctx": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Context",
                "resolved": "Context",
                "references": {
                    "Context": {
                        "location": "import",
                        "path": "../../model/context.model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "this"
        },
        "value": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "url": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "url",
            "reflect": false
        },
        "process": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string|object",
                "resolved": "object | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "process",
            "reflect": false
        },
        "activity": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "activity",
            "reflect": false
        },
        "sessionId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "session-id",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "wfMessage",
            "name": "wfMessage",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setServices": {
            "complexType": {
                "signature": "(ctx: Context) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Context": {
                        "location": "import",
                        "path": "../../model/context.model"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "load": {
            "complexType": {
                "signature": "(process: any, next?: string, sessionId?: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "addActivity": {
            "complexType": {
                "signature": "(activity: Activity) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Activity": {
                        "location": "import",
                        "path": "../../activities/activity"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "addValidator": {
            "complexType": {
                "signature": "(validator: Validator) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Validator": {
                        "location": "import",
                        "path": "../../validators/validator"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "process",
            "methodName": "processChangeHandler"
        }]; }
}
