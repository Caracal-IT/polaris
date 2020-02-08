import { Activity } from "./activity";

export class NullActivity implements Activity {
    name = "undefined";
    type = "null-activity";

    execute(): Promise<boolean> {
        return new Promise((_resolve, reject) => reject());
    }
}
