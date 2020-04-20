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
System.register(['./index-c230ee00.system.js'], function (exports) {
    'use strict';
    var registerInstance;
    return {
        setters: [function (module) {
                registerInstance = module.r;
            }],
        execute: function () {
            var AnalyticsService = /** @class */ (function () {
                function AnalyticsService() {
                }
                AnalyticsService.prototype.sendMessage = function (event) {
                    this.sendPostMessage(event.detail);
                };
                AnalyticsService.prototype.send = function (type, path) {
                    var wfElement = path.find(function (i) { return i["wf-Workflow"] !== undefined; });
                    if (!wfElement)
                        return;
                    var payload = this.createPayload(type, wfElement, path);
                    if (payload) {
                        this.sendPostMessage({
                            type: payload.type,
                            process: payload.process,
                            activity: payload.activity,
                            control: payload.control,
                            valueHash: payload.valueHash,
                            path: payload.wfPath.map(this.getName)
                        });
                    }
                };
                AnalyticsService.prototype.getPath = function (event) {
                    return event.composedPath(event);
                };
                AnalyticsService.prototype.sendPostMessage = function (message) {
                    var msg = Object.assign(Object.assign({}, message), { timestamp: Date.now() });
                    console.log("ANALYTICS", msg);
                    window.postMessage(msg, "*");
                };
                AnalyticsService.prototype.getName = function (item) {
                    if (item.id)
                        return item.id;
                    if (item.page && item.page.name)
                        return item.page.name;
                    return "";
                };
                AnalyticsService.prototype.createPayload = function (type, wfElement, path) {
                    var p = path.filter(function (i) { return i.nodeName && i.nodeName.indexOf("document-fragment") === -1; });
                    var wfPage = p.find(function (i) { return i.localName === "polaris-workflow"; });
                    if (!wfPage)
                        return null;
                    var activity = wfPage.ctx.wf.activity;
                    var wfPath = p.slice(0, p.indexOf(wfPage) + 1);
                    if (!activity.name)
                        return null;
                    var process = wfPage.ctx.wf.process.name;
                    var act = activity.name;
                    var control = wfElement.id;
                    var valueHash = this.getHashCode(wfElement.value);
                    return { type: type, process: process, activity: act, control: control, valueHash: valueHash, wfPath: wfPath };
                };
                AnalyticsService.prototype.getHashCode = function (value) {
                    var hash = 0;
                    var chr;
                    if (!value || value.length === 0)
                        return hash;
                    for (var i = 0; i < value.length; i++) {
                        chr = value.charCodeAt(i);
                        hash = ((hash << 5) - hash) + chr;
                        hash |= 0; // Convert to 32bit integer
                    }
                    return hash;
                };
                ;
                return AnalyticsService;
            }());
            var PolarisAnalytics = exports('polaris_analytics', /** @class */ (function () {
                function class_1(hostRef) {
                    registerInstance(this, hostRef);
                }
                class_1.prototype.analyticsHandler = function (event) {
                    return __awaiter(this, void 0, void 0, function () {
                        var path, wfElement;
                        return __generator(this, function (_a) {
                            path = PolarisAnalytics.analyticsService.getPath(event);
                            if (PolarisAnalytics.lastPath[0] === path[0])
                                return [2 /*return*/];
                            PolarisAnalytics.lastPath = path;
                            wfElement = path.find(function (i) { return i["wf-Workflow"] !== undefined; });
                            if (!wfElement)
                                return [2 /*return*/];
                            path[0].addEventListener("blur", this.onBlur);
                            PolarisAnalytics.analyticsService.send("click", path);
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.wfMessage = function (event) {
                    PolarisAnalytics.analyticsService.sendMessage(event);
                };
                class_1.prototype.onBlur = function (event) {
                    PolarisAnalytics.analyticsService.send("blur", PolarisAnalytics.lastPath);
                    event.target.removeEventListener("blur", this.onBlur);
                };
                return class_1;
            }()));
            PolarisAnalytics.lastPath = [null];
            PolarisAnalytics.analyticsService = new AnalyticsService();
        }
    };
});
