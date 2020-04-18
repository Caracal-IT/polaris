var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register(['./index-85f2877b.system.js'], function (exports) {
    'use strict';
    var registerInstance, createEvent, getElement;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                createEvent = module.c;
                getElement = module.g;
            }],
        execute: function () {
            var HttpService = /** @class */ (function () {
                function HttpService(ctx) {
                    this.ctx = ctx;
                }
                HttpService.prototype.fetch = function (endpoint) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, error;
                        var _this = this;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, , 5, 6]);
                                    this.ctx.page.sendMessage({ type: "START_LOADING" });
                                    return [4 /*yield*/, fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint))];
                                case 1:
                                    response = _d.sent();
                                    if (!(response.status >= 400)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    error = _d.sent();
                                    if (response.status >= 401)
                                        this.ctx.page.sendMessage({ type: "UN_AUTHORIZED", metadata: { endpoint: endpoint, error: error } });
                                    throw {
                                        code: response.status,
                                        message: response.statusText,
                                        error: error
                                    };
                                case 3: return [4 /*yield*/, response.json()];
                                case 4: return [2 /*return*/, _d.sent()];
                                case 5:
                                    setTimeout(function () { return _this.ctx.page.sendMessage({ type: "END_LOADING" }); });
                                    return [7 /*endfinally*/];
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                };
                HttpService.prototype.getConfig = function (endpoint) {
                    var config = {
                        method: endpoint.method,
                        mode: 'cors',
                        headers: Object.apply({ "Content-Type": "application/json" }, endpoint.headers),
                        redirect: 'follow',
                        referrer: 'no-referrer',
                        body: endpoint.body ? JSON.stringify(endpoint.body) : null
                    };
                    return config;
                };
                HttpService.prototype.resolveSetting = function (val, counter) {
                    if (counter === void 0) { counter = 0; }
                    if (counter > 2)
                        return val;
                    var matches = val.match(/\[[\w|_]+\]/g);
                    if (!matches)
                        return val;
                    var result = matches.reduce(this.replace.bind(this), val);
                    if (result.indexOf('[') > -1)
                        result = this.resolveSetting(result, counter++);
                    return result;
                };
                HttpService.prototype.replace = function (prev, next) {
                    var replacement = this.ctx.config.getSetting(next);
                    if (replacement && replacement.indexOf('[SELF]') > -1)
                        return replacement.replace('[SELF]', prev.replace(next, ''));
                    return prev.replace(next, replacement);
                };
                return HttpService;
            }());
            function currencyFormat(value, _d) {
                var locale = _d[0], currency = _d[1];
                var formatter = new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency,
                });
                return formatter.format(+value);
            }
            var PipeFactory = /** @class */ (function () {
                function PipeFactory() {
                    this.currencyFormat = currencyFormat;
                }
                return PipeFactory;
            }());
            var ModelService = /** @class */ (function () {
                function ModelService(config) {
                    this.config = config;
                    this.model = {};
                    this.sessionId = this.UUID();
                    this.pipes = new PipeFactory();
                }
                ModelService.prototype.getValue = function (key, model) {
                    if (model === void 0) { model = this.model; }
                    if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
                        return this.config.getSetting(key);
                    var val = key.split(".").reduce(function (total, currentElement) { return total ? total[currentElement] : undefined; }, Object.assign({}, model));
                    if (!key.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g) && val === undefined)
                        return key;
                    return val;
                };
                ModelService.prototype.getInterpolatedValue = function (value) {
                    var _this = this;
                    if (!value)
                        return value;
                    var myRegexp = /\{\{\[*(?:(\w|\.|\||-)+)\]*\}\}/g;
                    var match = value.match(myRegexp);
                    if (!match || match.length === 0)
                        return value;
                    return match.reduce(function (prev, curr) { return _this.replaceAll(prev, curr); }, value);
                };
                ModelService.prototype.setValue = function (key, val) {
                    if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
                        this.config.addSetting(key, val);
                    else
                        this.model = this.merge(this.model, key, val);
                };
                ModelService.prototype.save = function () {
                    sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));
                };
                ModelService.prototype.load = function () {
                    var value = sessionStorage.getItem(this.sessionId);
                    this.clearCache();
                    if (!value)
                        return;
                    this.model = JSON.parse(value);
                };
                ModelService.prototype.clearCache = function () {
                    sessionStorage.clear();
                };
                ModelService.prototype.merge = function (model, name, value) {
                    if (!name)
                        return;
                    var newModel = Object.assign({}, model);
                    name
                        .split(".")
                        .reduce(function (total, current, index, arr) {
                        total[current] = index == arr.length - 1 ? value : Object.assign({}, total[current]);
                        return total[current];
                    }, newModel);
                    return newModel;
                };
                ModelService.prototype.UUID = function () {
                    return 'xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                ModelService.prototype.replaceAll = function (value, key) {
                    var expr = key.substring(2, key.length - 2);
                    var values = expr.split('|');
                    var params = values.slice(2);
                    var newValue = this.getValue(values[0]);
                    if (values && values.length > 1 && this.pipes[values[1]])
                        newValue = this.pipes[values[1]](newValue, params);
                    return value.replace(key, newValue);
                };
                return ModelService;
            }());
            var ConfigService = /** @class */ (function () {
                function ConfigService() {
                    this.settings = {};
                }
                ConfigService.prototype.getSetting = function (key) {
                    return this.settings[key];
                };
                ConfigService.prototype.addSetting = function (key, setting) {
                    if (key.indexOf('[') === -1)
                        key = "[" + key + "]";
                    this.settings[key] = setting;
                };
                return ConfigService;
            }());
            var RedirectActivity = /** @class */ (function () {
                function RedirectActivity() {
                    this.name = "redirect";
                    this.type = "redirect-activity";
                }
                RedirectActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, params;
                        return __generator(this, function (_d) {
                            this.ctx.model.save();
                            params = ((_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name) + "-" + this.next + "-" + this.ctx.model.sessionId;
                            window.location.href = this.location + "?returnUrl=" + params;
                            return [2 /*return*/, true];
                        });
                    });
                };
                return RedirectActivity;
            }());
            var FinishActivity = /** @class */ (function () {
                function FinishActivity() {
                    this.name = "finish";
                    this.type = "finish-activity";
                }
                FinishActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var ipc;
                        return __generator(this, function (_d) {
                            if (this.ctx.wf.stack.length === 0) {
                                if (this.next)
                                    this.ctx.wf.goto(this.next);
                                return [2 /*return*/, true];
                            }
                            ipc = this.ctx.wf.stack.pop();
                            this.ctx.wf.setProcess(ipc.process, ipc.activity);
                            return [2 /*return*/, true];
                        });
                    });
                };
                return FinishActivity;
            }());
            var IPCActivity = /** @class */ (function () {
                function IPCActivity() {
                    this.name = "ipc";
                    this.type = "ipc-activity";
                }
                IPCActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            if (this.process && this.process.length > 0) {
                                this.ctx.wf.stack.push({
                                    process: this.ctx.wf.process.name,
                                    activity: this.next
                                });
                                this.ctx.wf.setProcess(this.ctx.model.getInterpolatedValue(this.process), 'start', this.next ? false : true);
                            }
                            return [2 /*return*/, true];
                        });
                    });
                };
                return IPCActivity;
            }());
            var CodeActivity = /** @class */ (function () {
                function CodeActivity() {
                    this.name = "code";
                    this.type = "code-activity";
                }
                CodeActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            this.eval(this.expression, this.ctx);
                            if (this.next && this.next.length > 0)
                                this.ctx.wf.goto(this.next);
                            return [2 /*return*/, true];
                        });
                    });
                };
                CodeActivity.prototype.eval = function (expression, ctx) {
                    var f = new Function('ctx', expression);
                    return f(ctx);
                };
                return CodeActivity;
            }());
            var PageActivity = /** @class */ (function () {
                function PageActivity() {
                    this.name = "start";
                    this.type = "page-activity";
                }
                PageActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            if (this.ctx.page.controls)
                                this.ctx.page.controls = this.controls || [];
                            return [2 /*return*/, true];
                        });
                    });
                };
                return PageActivity;
            }());
            var NullActivity = /** @class */ (function () {
                function NullActivity() {
                    this.name = "undefined";
                    this.type = "null-activity";
                }
                NullActivity.prototype.execute = function () {
                    return new Promise(function (_resolve, reject) { return reject("NULL Activity"); });
                };
                return NullActivity;
            }());
            var ApiActivity = /** @class */ (function () {
                function ApiActivity() {
                    this.name = "start";
                    this.type = "api-activity";
                }
                ApiActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, this.callEndpoints()];
                                case 1:
                                    _d.sent();
                                    this.gotoNext();
                                    return [2 /*return*/, true];
                            }
                        });
                    });
                };
                ApiActivity.prototype.callEndpoints = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, _d, endpoint;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    _i = 0, _d = this.endpoints;
                                    _e.label = 1;
                                case 1:
                                    if (!(_i < _d.length)) return [3 /*break*/, 4];
                                    endpoint = _d[_i];
                                    endpoint.body = this.getBody(endpoint);
                                    return [4 /*yield*/, this.callEndpoint(this.ctx.http, endpoint)];
                                case 2:
                                    _e.sent();
                                    _e.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    ;
                                    return [2 /*return*/, true];
                            }
                        });
                    });
                };
                ApiActivity.prototype.callEndpoint = function (http, endpoint) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_d) {
                            return [2 /*return*/, http.fetch(endpoint)
                                    .then(function (data) { return _this.setModel(endpoint, data); })];
                        });
                    });
                };
                ApiActivity.prototype.gotoNext = function () {
                    if (this.next && this.ctx)
                        this.ctx.wf.goto(this.next);
                };
                ApiActivity.prototype.getBody = function (endpoint) {
                    if (!this.ctx || !this.ctx.model || endpoint.method.toUpperCase() === "GET" || endpoint.method.toUpperCase() === "DELETE")
                        return null;
                    var model = this.ctx.model;
                    var mappings = endpoint.mappings;
                    var body = {};
                    mappings
                        .filter(function (m) { return m.direction === 'out' || m.direction === 'inout'; })
                        .forEach(function (m) {
                        var _d;
                        return Object.assign(body, (_d = {}, _d[m.remote] = model.getValue(m.client), _d));
                    });
                    return body;
                };
                ApiActivity.prototype.setModel = function (endpoint, data) {
                    if (!this.ctx || !this.ctx.model)
                        return;
                    var model = this.ctx.model;
                    var mappings = endpoint.mappings;
                    if (!mappings || mappings.length === 0)
                        return Object.keys(data).forEach(function (k) { return model.setValue(k, data[k]); });
                    mappings
                        .filter(function (m) { return m.direction === 'in' || m.direction === 'inout'; })
                        .forEach(function (m) { return model.setValue(m.client, model.getValue(m.remote, data)); });
                };
                return ApiActivity;
            }());
            var AssignActivity = /** @class */ (function () {
                function AssignActivity() {
                    this.name = "assign";
                    this.type = "assign-activity";
                }
                AssignActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var value;
                        return __generator(this, function (_d) {
                            value = this.ctx.model.getInterpolatedValue(this.value);
                            this.ctx.model.setValue(this.key, value);
                            this.ctx.wf.goto(this.next);
                            return [2 /*return*/, true];
                        });
                    });
                };
                return AssignActivity;
            }());
            var DecisionActivity = /** @class */ (function (_super) {
                __extends(DecisionActivity, _super);
                function DecisionActivity() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.name = "decision";
                    _this.type = "decision-activity";
                    return _this;
                }
                DecisionActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var exp;
                        return __generator(this, function (_d) {
                            exp = "return " + this.ctx.model.getInterpolatedValue(this.expression) + ";";
                            if (this.eval(exp, this.ctx))
                                this.ctx.wf.goto(this.trueAction);
                            else
                                this.ctx.wf.goto(this.falseAction);
                            return [2 /*return*/, true];
                        });
                    });
                };
                return DecisionActivity;
            }(CodeActivity));
            var SwitchActivity = /** @class */ (function (_super) {
                __extends(SwitchActivity, _super);
                function SwitchActivity() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.name = "switch";
                    _this.type = "switch-activity";
                    return _this;
                }
                SwitchActivity.prototype.execute = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, _d, rule, expression;
                        return __generator(this, function (_e) {
                            for (_i = 0, _d = this.rules || []; _i < _d.length; _i++) {
                                rule = _d[_i];
                                expression = "return " + this.ctx.model.getInterpolatedValue(rule.expression) + ";";
                                if (this.eval(expression, this.ctx)) {
                                    this.ctx.wf.goto(rule.next);
                                    return [2 /*return*/, true];
                                }
                            }
                            throw new Error("No valid rule in " + this.name + " found !!");
                        });
                    });
                };
                return SwitchActivity;
            }(CodeActivity));
            var ActivityFactory = /** @class */ (function () {
                function ActivityFactory() {
                }
                ActivityFactory.create = function (config, ctx) {
                    if (!config || !config.type)
                        return new NullActivity();
                    var act = ActivityFactory.activities.find(function (a) { return a.type === config.type; });
                    if (!act)
                        return new NullActivity();
                    return Object.assign(act, config, { ctx: ctx });
                };
                ActivityFactory.add = function (activity) {
                    var act = ActivityFactory.activities.find(function (a) { return a.type === activity.type; });
                    if (!act)
                        ActivityFactory.activities.push(activity);
                };
                return ActivityFactory;
            }());
            ActivityFactory.activities = [
                new NullActivity(),
                new PageActivity(),
                new ApiActivity(),
                new AssignActivity(),
                new CodeActivity(),
                new DecisionActivity(),
                new IPCActivity(),
                new FinishActivity(),
                new RedirectActivity(),
                new SwitchActivity()
            ];
            var WorkflowService = /** @class */ (function () {
                function WorkflowService(ctx) {
                    this.ctx = ctx;
                    this.stack = [];
                }
                WorkflowService.prototype.setProcess = function (process, next, clearStack) {
                    if (next === void 0) { next = "start"; }
                    if (clearStack === void 0) { clearStack = true; }
                    return __awaiter(this, void 0, void 0, function () {
                        var err_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 3, , 4]);
                                    if (clearStack)
                                        this.stack = [];
                                    if (!(typeof process === "string" && this.loader)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.loader.load(process)];
                                case 1:
                                    process = _d.sent();
                                    _d.label = 2;
                                case 2:
                                    this.process = process;
                                    this.activity = null;
                                    this.goto(next);
                                    this.ctx.page.sendMessage({ type: "PROCESS_CHANGED", metadata: { stack: this.stack } });
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _d.sent();
                                    if (err_1) {
                                        console.error(err_1);
                                        this.ctx.page.sendMessage({ type: "ERROR", description: err_1.message, metadata: err_1 });
                                    }
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                WorkflowService.prototype.goto = function (name) {
                    setTimeout(this.tryNext.bind(this, name));
                };
                WorkflowService.prototype.tryNext = function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 2, , 3]);
                                    this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGING" });
                                    return [4 /*yield*/, this.next(name)];
                                case 1:
                                    _d.sent();
                                    this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGED" });
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _d.sent();
                                    this.ctx.page.sendMessage({ type: "ERROR", description: err_2 === null || err_2 === void 0 ? void 0 : err_2.message, metadata: err_2 });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                WorkflowService.prototype.next = function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, newActivity;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!this.process || !this.process.activities)
                                        return [2 /*return*/, null];
                                    if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate(this.ctx))
                                        return [2 /*return*/, null];
                                    newActivity = this.process
                                        .activities
                                        .find(function (a) { return a.name == name; });
                                    if (!newActivity)
                                        throw new Error("Activity " + name + " not found");
                                    this.activity = newActivity;
                                    return [4 /*yield*/, ActivityFactory.create(this.activity, this.ctx)
                                            .execute()];
                                case 1: return [2 /*return*/, _d.sent()];
                            }
                        });
                    });
                };
                return WorkflowService;
            }());
            var Validator = /** @class */ (function () {
                function Validator(name) {
                    this.name = name;
                }
                Validator.prototype.setError = function (control, error, message) {
                    control.error = error;
                    control.errorMessage = error ? message : null;
                    if (control.el) {
                        control.el.setAttribute("error", control.error ? "true" : "false");
                        control.el.setAttribute("errorMessage", control.errorMessage);
                    }
                    if (control.el.nextSibling["attributes"]["wf-error"])
                        control.el.nextSibling.textContent = control.errorMessage;
                };
                return Validator;
            }());
            var RequiredValidator = /** @class */ (function (_super) {
                __extends(RequiredValidator, _super);
                function RequiredValidator() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RequiredValidator.prototype.validate = function (context, control, config) {
                    var value = context.model.getValue(control.id);
                    var isEmpty = value === null || value === undefined || value.length === 0;
                    _super.prototype.setError.call(this, control, isEmpty, config.message);
                    return !isEmpty;
                };
                return RequiredValidator;
            }(Validator));
            var RegexValidator = /** @class */ (function (_super) {
                __extends(RegexValidator, _super);
                function RegexValidator() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RegexValidator.prototype.validate = function (context, control, config) {
                    var value = context.model.getValue(control.id);
                    var regex = new RegExp(config.expression, 'g');
                    var result = regex.exec(value);
                    var isValid = result ? true : false;
                    _super.prototype.setError.call(this, control, !isValid, config.message);
                    return isValid;
                };
                return RegexValidator;
            }(Validator));
            var RangeValidator = /** @class */ (function (_super) {
                __extends(RangeValidator, _super);
                function RangeValidator() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RangeValidator.prototype.validate = function (context, control, config) {
                    var value = +context.model.getValue(control.id);
                    var isValid = value >= config.min && value <= config.max;
                    _super.prototype.setError.call(this, control, !isValid, config.message);
                    return isValid;
                };
                return RangeValidator;
            }(Validator));
            var ValidatorService = /** @class */ (function () {
                function ValidatorService() {
                    this.validators = [
                        new RequiredValidator("required"),
                        new RegexValidator("regex"),
                        new RangeValidator("range")
                    ];
                }
                ValidatorService.prototype.validate = function (ctx) {
                    if (!ctx.page || !ctx.page.controls)
                        return true;
                    var isValid = true;
                    for (var _i = 0, _d = ctx.page.controls; _i < _d.length; _i++) {
                        var ctrl = _d[_i];
                        isValid = this.validateControl(ctx, ctrl) && isValid;
                    }
                    return isValid;
                };
                ValidatorService.prototype.addValidator = function (validator) {
                    var val = this.validators.find(function (v) { return v.name === validator.name; });
                    if (!val)
                        this.validators.push(validator);
                };
                ValidatorService.prototype.validateControl = function (ctx, control) {
                    if (!control)
                        return true;
                    var isValid = true;
                    for (var index in control.controls)
                        isValid = this.validateControl(ctx, control.controls[index]) && isValid;
                    if (control.validators && control.validators.length > 0) {
                        var _loop_1 = function (config) {
                            var validator = this_1.validators.find(function (v) { return v.name === config.name; });
                            if (!validator)
                                return "continue";
                            if (!validator.validate(ctx, control, config)) {
                                isValid = false;
                                this_1.sendErrorMsg(ctx, validator, control);
                                return "break";
                            }
                        };
                        var this_1 = this;
                        for (var _i = 0, _d = control.validators; _i < _d.length; _i++) {
                            var config = _d[_i];
                            var state_1 = _loop_1(config);
                            if (state_1 === "break")
                                break;
                        }
                    }
                    return isValid;
                };
                ValidatorService.prototype.sendErrorMsg = function (ctx, validator, control) {
                    ctx.page.sendMessage({
                        type: "VALIDATION_ERROR",
                        description: control.errorMessage,
                        metadata: {
                            validator: validator.name,
                            control: control.id
                        }
                    });
                };
                return ValidatorService;
            }());
            var PageBuilder = /** @class */ (function () {
                function PageBuilder(ctx) {
                    this.ctx = ctx;
                }
                PageBuilder.prototype.build = function (parent, onInput) {
                    this.onInput = onInput;
                    this.clearPage(parent);
                    this.ctx.controls.forEach(this.addComponent.bind(this, parent));
                };
                PageBuilder.prototype.clearPage = function (parent) {
                    for (var i = parent.childNodes.length - 1; i >= 0; i--)
                        parent.removeChild(parent.childNodes[i]);
                };
                PageBuilder.prototype.addComponent = function (parent, control) {
                    var newEl;
                    if (control.tag === "polaris-workflow")
                        newEl = this.createWorkflowElement(control);
                    else
                        newEl = this.createElement(control);
                    parent.appendChild(newEl);
                    this.addErrorLabel(newEl);
                };
                PageBuilder.prototype.createWorkflowElement = function (control) {
                    var el = document.createElement(control.tag);
                    var newEl = Object.assign(el, control);
                    newEl.setServices(this.ctx);
                    return newEl;
                };
                PageBuilder.prototype.createElement = function (control) {
                    var _a;
                    var el = document.createElement(control.tag);
                    var options = {
                        "wf-Workflow": "",
                        "ctx": this.ctx
                    };
                    var newEl = Object.assign(el, control, options);
                    control.el = newEl;
                    this.bind(newEl);
                    this.bindCaption(newEl, control);
                    (_a = control.controls) === null || _a === void 0 ? void 0 : _a.forEach(this.addComponent.bind(this, newEl));
                    return newEl;
                };
                PageBuilder.prototype.bind = function (newEl) {
                    if (!newEl.id || newEl.value === undefined)
                        return;
                    var newValue = this.ctx.model.getValue(newEl.id);
                    if (newValue !== undefined)
                        newEl.value = newValue;
                    this.ctx.model.setValue(newEl.id, newEl.value);
                    newEl.oninput = this.onInput.bind(this, newEl);
                };
                PageBuilder.prototype.bindCaption = function (newEl, control) {
                    this.interpolate('caption', newEl, control);
                    this.interpolate('textContent', newEl, control);
                    this.interpolate('innerHTML', newEl, control);
                };
                PageBuilder.prototype.interpolate = function (prop, newEl, control) {
                    if (!newEl[prop])
                        return;
                    newEl[prop] = this.ctx.model.getInterpolatedValue(control[prop] || newEl[prop]);
                };
                PageBuilder.prototype.addErrorLabel = function (newEl) {
                    if (!newEl.validators)
                        return;
                    var errLabel = document.createElement("span");
                    errLabel.setAttribute("wf-error", "error");
                    newEl.parentNode.appendChild(errLabel);
                };
                return PageBuilder;
            }());
            var HttpWorkflowLoader = /** @class */ (function () {
                function HttpWorkflowLoader(http) {
                    this.http = http;
                }
                HttpWorkflowLoader.prototype.load = function (processName) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, this.http.fetch({ url: "[WF]/" + processName, method: 'get' })];
                                case 1: return [2 /*return*/, _d.sent()];
                            }
                        });
                    });
                };
                return HttpWorkflowLoader;
            }());
            var PolarisWorkflow = exports('polaris_workflow', /** @class */ (function () {
                function class_1(hostRef) {
                    registerInstance(this, hostRef);
                    this._components = [];
                    this.page = this;
                    this.ctx = this;
                    this.http = new HttpService(this.ctx);
                    this.config = new ConfigService();
                    this.model = new ModelService(this.ctx.config);
                    this.wf = new WorkflowService(this.ctx);
                    this.validator = new ValidatorService();
                    this.wfMessage = createEvent(this, "wfMessage", 7);
                }
                class_1.prototype.processChangeHandler = function () {
                    this.load(this.process, this.activity, this.sessionId);
                };
                Object.defineProperty(class_1.prototype, "controls", {
                    get: function () { return this._components; },
                    set: function (val) {
                        this._components = val;
                        this._render();
                    },
                    enumerable: true,
                    configurable: true
                });
                class_1.prototype.setServices = function (ctx) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            this.model = ctx.model;
                            this.http = ctx.http;
                            this.config = ctx.config;
                            this.validator = ctx.validator;
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.load = function (process, next, sessionId) {
                    if (next === void 0) { next = "start"; }
                    if (sessionId === void 0) { sessionId = ''; }
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (sessionId && sessionId.length > 0) {
                                        this.ctx.model.sessionId = sessionId;
                                        this.ctx.model.load();
                                    }
                                    return [4 /*yield*/, this.wf.setProcess(process, next)];
                                case 1:
                                    _d.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                class_1.prototype.addActivity = function (activity) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            ActivityFactory.add(activity);
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.addValidator = function (validator) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            this.validator.addValidator(validator);
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.sendMessage = function (message) {
                    var _a, _b, _c;
                    var metaData = {
                        process: (_a = this.wf.process) === null || _a === void 0 ? void 0 : _a.name,
                        activity: (_b = this.wf.activity) === null || _b === void 0 ? void 0 : _b.name,
                        activityType: (_c = this.wf.activity) === null || _c === void 0 ? void 0 : _c.type,
                        timestamp: Date.now()
                    };
                    this.wfMessage.emit(Object.assign(Object.assign({}, message), metaData));
                };
                class_1.prototype.componentWillLoad = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var settings_1;
                        var _this = this;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!this.url) return [3 /*break*/, 2];
                                    this.config.addSetting("[settingsUrl]", this.url);
                                    return [4 /*yield*/, this.http.fetch({ method: "GET", url: this.url })];
                                case 1:
                                    settings_1 = _d.sent();
                                    Object.keys(settings_1).forEach(function (k) { return _this.config.addSetting(k, settings_1[k]); });
                                    _d.label = 2;
                                case 2:
                                    if (!this._loader) {
                                        this._loader = new HttpWorkflowLoader(this.http);
                                        this.wf.loader = this._loader;
                                    }
                                    if (this.parent)
                                        this.setServices(this.parent);
                                    if (this.process)
                                        this.load(this.process, this.activity, this.sessionId);
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                class_1.prototype.onInput = function (newEl) {
                    this.model.setValue(newEl.id, newEl.value);
                    if (newEl.hasAttribute('error'))
                        this.validator.validate(this);
                };
                class_1.prototype._render = function () {
                    var builder = new PageBuilder(this);
                    builder.build(this.el, this.onInput.bind(this));
                };
                Object.defineProperty(class_1.prototype, "el", {
                    get: function () { return getElement(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1, "watchers", {
                    get: function () {
                        return {
                            "process": ["processChangeHandler"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }()));
        }
    };
});
