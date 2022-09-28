import { ActivityFactory } from "../activities/activity-factory";

import { Context } from "../model/context.model";
import { Process } from "../model/process.model";
import { Activity } from "../activities/activity";
import { WorkflowLoader } from "../utilities/workflow-loader.utility";

export interface WFStack {
    process: string;
    activity: string;
}

export class WorkflowService {
    loader: WorkflowLoader;

    process: Process | null;
    activity: Activity;
    
    stack: WFStack[] = [];

    constructor(private ctx: Context){}
    
    async setProcess(process: string | Process, next = "start", clearStack = true): Promise<void> {
        try {
            if(clearStack)
                this.stack = [];
                
            if(typeof process === "string" && this.loader != null)              
                process = await this.loader.load(process);
            
            if(typeof process === "string")
                return Promise.reject("Workflow not found");

            this.process = process; 
            this.activity = null;

            this.goto(next);

            this.ctx.page.sendMessage({type: "PROCESS_CHANGED", metadata: {stack: this.stack}});
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
            this.ctx.page.sendMessage({type: "WORKFLOW_CHANGING"});
            await this.next(name);
            this.ctx.page.sendMessage({type: "WORKFLOW_CHANGED"});
        }
        catch(err) {
            this.ctx.page.sendMessage({type: "ERROR", description: err?.message, metadata: err});
        }        
    }

    private async next(name: string) {
        if(typeof this.process === "string" ||  !this.process || !this.process.activities)
            return null;
            
        if(this.ctx.wf.activity?.type === "page-activity" && !this.ctx.validator.validate(this.ctx))             
            return null;
            
        let newActivity = this.process
                              .activities
                              .find(a => a.name === name);                
                            
        if(!newActivity)
            throw new Error(`Activity ${name} not found`);

        this.activity = newActivity;

        
        return ActivityFactory.create(this.activity, this.ctx)
                                    .execute();
    }
}