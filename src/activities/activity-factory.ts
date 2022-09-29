import { RedirectActivity } from './redirect.activity';
import { FinishActivity } from './finish.activity';
import { IPCActivity } from './ipc.activity';
import { CodeActivity } from './code.activity';
import { Activity } from "./activity";
import { PageActivity } from "./page.activity";
import { NullActivity } from "./null.activity";
import { Context } from "../model/context.model";
import { ApiActivity } from "./api.activity";
import { AssignActivity } from "./assign.activity";
import { DecisionActivity } from "./decision.activity";
import { SwitchActivity } from './switch.activity';

export class ActivityFactory {
    static activities: Activity[] = [
        new NullActivity(),
        new PageActivity(),
        new ApiActivity(),
        new AssignActivity(),
        new CodeActivity(),
        new DecisionActivity(),
        new IPCActivity(),
        new FinishActivity(),
        new RedirectActivity(),
        new SwitchActivity()
    ];

    static create(config: object, ctx: Context): Activity {
        if (config === null || config === undefined || config["type"] === undefined || config["type"] === null)
            return new NullActivity();

        let act = ActivityFactory.activities.find(a => a["type"] === config["type"]);

        if (act == null)
            return new NullActivity();

        return Object.assign(act, config, { ctx });
    }

    static add(activity: Activity, replace = false) {
        const notFound = -1;
        const deleteCount = 1;

        let index = ActivityFactory.activities.findIndex(a => a.type === activity.type);

        if (index > notFound && !replace)
            return;

        if (index > notFound)
            ActivityFactory.activities.splice(index, deleteCount);
        
        ActivityFactory.activities.push(activity); 
    }
}
