import { BaseActivity } from "./base.activity";

export class FinishActivity extends BaseActivity {
    name: string = "finish";
    "type": string = "finish-activity";
       
    async execute(): Promise<boolean> {
        if(this.ctx.wf.stack.length === 0) {
            this.gotoNext();

            return true;
        }

        const ipc = this.ctx.wf.stack.pop();
        await this.ctx.wf.setProcess(ipc.process, ipc.activity);
            
        return true;
    }
}