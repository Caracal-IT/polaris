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

            this.goto(next);
        }
        catch(err) {
            if(err)
                this.ctx.page.sendMessage({type: "ERROR", description: err.message, metadata: err});
        }
    }

    goto(name: string) {
        setTimeout(this.tryNext.bind(this, name));    
    }

    private async tryNext(name: string) {
        try {
            this.ctx.page.sendMessage({type: "WORKFLOW_CHANGING"});
            await this.next(name);
        }
        catch(err) {
            this.ctx.page.sendMessage({type: "ERROR", description: err?.message, metadata: err});
        }
        finally {
           this.ctx.page.sendMessage({type: "WORKFLOW_CHANGED"});
        }
    }

    private async next(name: string) {
        if(!this.process || !this.process.activities)
        return null;
    
        if(this.ctx.wf.activity?.type === "page-activity" && !this.ctx.validator.validate())             
            return null;
                
        this.activity = this.process
                        .activities
                        .find(a => a.name == name);        

        this.ctx.page.sendMessage({type: "START_LOADING"});
        const result = await ActivityFactory.create(this.activity, this.ctx)
                                            .execute();
        this.ctx.page.sendMessage({type: "END_LOADING"});

        return result;
    }
}