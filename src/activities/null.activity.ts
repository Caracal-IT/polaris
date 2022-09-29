import { Activity } from "./activity";

export class NullActivity implements Activity {
    name: string = "undefined";
    "type": string = "null-activity";

    async execute(): Promise<boolean> {
        return new Promise((_resolve, reject) => reject("NULL Activity"));
    }
}
