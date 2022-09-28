import { BaseActivity } from "./base.activity";

export class AssignActivity extends BaseActivity {
    name = "assign";
    type = "assign-activity";
    key: string;
    value: string | null | undefined;
    
    async execute(): Promise<boolean> {
        const value = this.ctx.model.getInterpolatedValue(this.value);            
                
        this.ctx.model.setValue(this.key, value);         
        this.gotoNext();
            
        return true;
    }
}