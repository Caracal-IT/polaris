import { AnalyticsService } from "../../services/analytics.service";

export class PolarisAnalytic extends HTMLElement {
    static lastPath: any = [null];
    static analyticsService: AnalyticsService = new AnalyticsService();

    connectedCallback() {
        document.addEventListener('click', this.analyticsHandler);
        document.addEventListener('wfMessage', this.wfMessage);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.analyticsHandler);
        document.removeEventListener('wfMessage', this.wfMessage);
    }

    async analyticsHandler(event: any) {
        const path = PolarisAnalytic.analyticsService.getPath(event);

        if(PolarisAnalytic.lastPath[0] === path[0])
          return;
 
        PolarisAnalytic.lastPath = path;

        const wfElement =  path.find((i: HTMLElement) => i["wf-Workflow"] !== undefined);

        if(!wfElement) 
          return;
          
        path[0].addEventListener("blur", this.onBlur);        
        PolarisAnalytic.analyticsService.send("click", path);
    }    

    wfMessage(event: any){
      PolarisAnalytic.analyticsService.sendMessage(event);
    }

    onBlur(event: Event) {
        PolarisAnalytic.analyticsService.send("blur", PolarisAnalytic.lastPath);
        event.target.removeEventListener("blur", this.onBlur);
    }
}

customElements.define('polaris-analytic', PolarisAnalytic);