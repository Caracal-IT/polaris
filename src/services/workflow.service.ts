import { ActivityFactory } from "../activities/activity-factory";

import { Context } from "../model/context.model";
import { Process } from "../model/process.model";
import { Activity } from "../activities/activity";

export interface WFStack {
    process: string;
    activity: string;
}

export class WorkflowService {
    process?:Process;
    activity: Activity;

    stack: Array<WFStack> = [];

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
            if(err) {
                console.error(err);
                this.ctx.page.sendMessage({type: "ERROR", description: err.message, metadata: err});
            }
        }
    }

    goto(name: string) {
        setTimeout(this.tryNext.bind(this, name));    
    }

    private async tryNext(name: string) {
        try {
            this.ctx.page.sendMessage({type: "START_LOADING"});
            this.ctx.page.sendMessage({type: "WORKFLOW_CHANGING"});
            await this.next(name);
            this.ctx.page.sendMessage({type: "WORKFLOW_CHANGED"});
        }
        catch(err) {
            this.ctx.page.sendMessage({type: "ERROR", description: err?.message, metadata: err});
        }
        finally {
            setTimeout(() => this.ctx.page.sendMessage({type: "END_LOADING"}));
        }
    }

    private async next(name: string) {
        if(!this.process || !this.process.activities)
        return null;
    
        if(this.ctx.wf.activity?.type === "page-activity" && !this.ctx.validator.validate())             
            return null;
                
        let newActivity = this.process
                        .activities
                        .find(a => a.name == name);    
                        
        if(!newActivity)
            throw new Error(`Activity ${name} not found`);

        this.activity = newActivity;

        
        return await ActivityFactory.create(this.activity, this.ctx)
                                    .execute();
    }
}