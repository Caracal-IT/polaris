import { ActivityFactory } from "../activities/activity-factory";

import { Context } from "../model/context.model";
import { Process } from "../model/process.model";

export class WorkflowService {
    private process?:Process;

    constructor(private ctx: Context){}
    
    async setProcess(process: any, next = "start") {
        this.process = process; 
        await this.goto(next);
    }

    async goto(name: string) {
        if(!this.process || !this.process.activities)
            return;

        const actDef = this.process
                           .activities
                           .find(a => a.name == name);

        return ActivityFactory.create(actDef, this.ctx)
                              .execute();
    }
}