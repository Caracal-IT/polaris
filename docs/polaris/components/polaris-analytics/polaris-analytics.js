import { AnalyticsService } from "../../services/analytics.service";
export class PolarisAnalytics {
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
    static get is() { return "polaris-analytics"; }
    static get listeners() { return [{
            "name": "click",
            "method": "analyticsHandler",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "wfMessage",
            "method": "wfMessage",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
PolarisAnalytics.lastPath = [null];
PolarisAnalytics.analyticsService = new AnalyticsService();
