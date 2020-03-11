import { RedirectActivity } from './redirect.activity';
import { FinishActivity } from './finish.activity';
import { IPCActivity } from './ipc.activity';
import { CodeActivity } from './code.activity';
import { PageActivity } from "./page.activity";
import { NullActivity } from "./null.activity";
import { ApiActivity } from "./api.activity";
import { AssignActivity } from "./assign.activity";
import { DecisionActivity } from "./decision.activity";
import { SwitchActivity } from './switch.activity';
export class ActivityFactory {
    static create(config, ctx) {
        if (!config || !config.type)
            return new NullActivity();
        let act = ActivityFactory.activities.find(a => a.type === config.type);
        if (!act)
            return new NullActivity();
        return Object.assign(act, config, { ctx });
    }
    static add(activity) {
        let act = ActivityFactory.activities.find(a => a.type === activity.type);
        if (!act)
            ActivityFactory.activities.push(activity);
    }
}
ActivityFactory.activities = [
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
