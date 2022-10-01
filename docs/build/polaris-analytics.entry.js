import { r as registerInstance } from './index-c8288121.js';

class AnalyticsService {
  sendMessage(event) {
    this.sendPostMessage(event["detail"]);
  }
  send(actType, path) {
    const wfElement = path.find(i => i["wf-Workflow"] !== undefined);
    if (!wfElement)
      return;
    const payload = this.createPayload(actType, wfElement, path);
    if (payload !== undefined && payload !== null) {
      this.sendPostMessage({
        type: payload.type,
        process: payload.process,
        activity: payload.activity,
        control: payload.control,
        valueHash: payload.valueHash,
        path: payload.wfPath.map(this.getName)
      });
    }
  }
  getPath(event) {
    return event.composedPath(event);
  }
  sendPostMessage(message) {
    const msg = { ...message, timestamp: Date.now() };
    console.log("ANALYTICS", msg);
    window.postMessage(msg, "*");
  }
  getName(item) {
    if (item.id != null)
      return item.id;
    if (item.page !== null && item.page.name !== null)
      return item.page.name;
    return "";
  }
  createPayload(actType, wfElement, path) {
    const notFound = -1;
    if (path == null || path == undefined)
      return null;
    const p = path.filter(i => i.nodeName !== undefined && i.nodeName !== null && i.nodeName.indexOf("document-fragment") === notFound);
    const wfPage = p.find(i => i.localName === "polaris-workflow");
    if (wfPage === null)
      return null;
    const wfPageElement = wfPage;
    const activity = wfPageElement.ctx.wf.activity;
    const wfPath = p.slice(0, p.indexOf(wfPage) + 1);
    if (activity.name === undefined || activity.name === null)
      return null;
    const process = wfPageElement.ctx.wf.process.name;
    const act = activity.name;
    const control = wfElement.id;
    const valueHash = this.getHashCode(wfElement["value"]);
    return { "type": actType, process, activity: act, control, valueHash, wfPath };
  }
  getHashCode(str) {
    if (str === undefined || str === null)
      return 0;
    const startIndex = 0;
    const hashLength = 31;
    let hash = startIndex;
    for (let i = startIndex; i < str.length; i = i + 1)
      hash = Math.imul(hashLength, hash) + str.charCodeAt(i);
    return hash;
  }
}

const PolarisAnalytics = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async analyticsHandler(event) {
    const path = PolarisAnalytics.analyticsService.getPath(event);
    if (PolarisAnalytics.lastPath[0] === path[0])
      return;
    PolarisAnalytics.lastPath = path;
    const wfElement = path.find((i) => i["wf-Workflow"] !== undefined);
    if (!wfElement)
      return;
    path[0].addEventListener("blur", this.onBlur);
    PolarisAnalytics.analyticsService.send("click", path);
  }
  wfMessage(event) {
    PolarisAnalytics.analyticsService.sendMessage(event);
  }
  onBlur(event) {
    PolarisAnalytics.analyticsService.send("blur", PolarisAnalytics.lastPath);
    event.target.removeEventListener("blur", this.onBlur);
  }
};
PolarisAnalytics.lastPath = [null];
PolarisAnalytics.analyticsService = new AnalyticsService();

export { PolarisAnalytics as polaris_analytics };

//# sourceMappingURL=polaris-analytics.entry.js.map