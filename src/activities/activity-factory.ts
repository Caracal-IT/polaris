import { Activity } from "./activity";
import { PageActivity } from "./page.activity";
import { NullActivity } from "./null.activity";
import { Context } from "../model/context.model";
import { ApiActivity } from "./api.activity";
import { AssignActivity } from "./assign.activity";
import { DecisionActivity } from "./decision.activity";

export class ActivityFactory {
    private static activities: Array<Activity> = [
        new NullActivity(),
        new PageActivity(),
        new ApiActivity(),
        new AssignActivity(),
        new DecisionActivity()
    ];

    static create(config: any, ctx: Context): Activity {
        if (!config || !config.type)
            return new NullActivity();

        let act = ActivityFactory.activities.find(a => a.type === config.type);

        if (!act)
            return new NullActivity();

        return Object.assign(act, config, { ctx });
    }
}
