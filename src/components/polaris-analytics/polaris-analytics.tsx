import { Component, Listen } from "@stencil/core";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
    tag: "polaris-analytics"
  })
  export class PolarisAnalytics {   
    static lastPath: any = [null];
    static analyticsService: AnalyticsService = new AnalyticsService();

    @Listen('click', { target: 'document' })
    async analyticsHandler(event: any) {
        const path = PolarisAnalytics.analyticsService.getPath(event);

        if(PolarisAnalytics.lastPath[0] === path[0])
          return;
 
        PolarisAnalytics.lastPath = path;

        const wfElement =  path.find((i: HTMLElement) => i["wf-Workflow"] !== undefined);

        if(!wfElement) 
          return;
          
        path[0].addEventListener("blur", this.onBlur);        
        PolarisAnalytics.analyticsService.send("click", path);
    }    

    @Listen('wfMessage', { target: 'document' })
    wfMessage(event: any){
      PolarisAnalytics.analyticsService.sendMessage(event);
    }

    onBlur(event: Event) {
        PolarisAnalytics.analyticsService.send("blur", PolarisAnalytics.lastPath);
        event.target.removeEventListener("blur", this.onBlur);
    }
  }