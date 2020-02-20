import { ActivityFactory } from "../activities/activity-factory";

import { Context } from "../model/context.model";
import { Process } from "../model/process.model";
import { Activity } from "../activities/activity";

export class WorkflowService {
    process?:Process;
    activity: Activity;

    constructor(private ctx: Context){}
    
    async setProcess(process: any, next = "start") {
        try {
            if(typeof process === "string")
                process = await this.ctx.http.fetch({url: `[WF]/${process}`, method: 'get'});

            this.process = process; 
            this.activity = null;

            await this.goto(next);
        }
        catch(ex) {
            console.error(ex);
        }
    }

    async goto(name: string) {
        if(!this.process || !this.process.activities)
            return;
        
        if(this.ctx.wf.activity?.type === "page-activity" && !this.ctx.validator.validate())             
            return;
                
        this.activity = this.process
                           .activities
                           .find(a => a.name == name);        

        return ActivityFactory.create(this.activity, this.ctx)
                              .execute();
    }
}