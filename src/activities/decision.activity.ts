import { Context } from "../model/context.model";

interface Condition {
    operator: 'and'|'or'|undefined|null;
    left: string;
    equality: string;
    right: string;
}

export class DecisionActivity implements DecisionActivity {
    name = "assign";
    type = "decision-activity";

    ctx?: Context;
    trueAction: string;
    falseAction: string;
    next: string;
    conditions: Array<Condition>;
    
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.model)
            return false;

        console.log("DECISION");  
        //const expression = `return ${this.left} ${this.equality} ${this.right};`
        //const result = super.eval(expression, context);
        
        this.ctx.wf.goto(this.next);
            
        return true;
    }
}

/* 
{
        "name": "page3",
        "type": "decision-activity",
        "left": "model.registration&&model.registration.firstName",
        "equality": "===",
        "right": "'Lourens'",
        "trueAction": "page2",
        "falseAction": "page1"
      },
*/