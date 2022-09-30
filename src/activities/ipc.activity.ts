import { BaseActivity } from "./base.activity";

export class IPCActivity extends BaseActivity {
    name: string = "ipc";
    "type": string = "ipc-activity";
    process: string; 
       
    async execute(): Promise<boolean> {
        if(this.process !== null && this.process.length > 0) {
            this.ctx.wf.stack.push({
                process: this.ctx.wf.process.name,
                activity: this.next
            });
          
            await this.ctx.wf.setProcess(this.ctx.model.getInterpolatedValue(this.process), 'start', this.next !== undefined ? false : true);
        }
            
        return true;
    }
}