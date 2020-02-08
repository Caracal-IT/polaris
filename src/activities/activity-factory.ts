import { Activity } from "./activity";
import { PageActivity } from "./page.activity";
import { NullActivity } from "./null.activity";
import { Context } from "../model/context.model";

export class ActivityFactory {
    private static activities: Array<Activity> = [
        new NullActivity(),
        new PageActivity()
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
