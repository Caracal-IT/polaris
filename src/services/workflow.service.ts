import { ActivityFactory } from "../activities/activity-factory";

import { Context } from "../model/context.model";
import { Process } from "../model/process.model";

export class WorkflowService {
    private process?:Process;

    constructor(private ctx: Context){}
    
    async setProcess(process: any, next = "start") {
        try {
            if(typeof process === "string")
                process = await this.ctx.http.fetch({url: `/wf/${process}`, method: 'get'});

            this.process = process; 
            await this.goto(next);
        }
        catch(ex) {
            console.error(ex);
        }
    }

    async goto(name: string) {
        if(!this.process || !this.process.activities)
            return;

        if(!this.ctx.validator.validate())
            return;

        const actDef = this.process
                           .activities
                           .find(a => a.name == name);

        return ActivityFactory.create(actDef, this.ctx)
                              .execute();
    }
}