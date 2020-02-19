import { Context } from "./context.model";

export interface Control {
    tag: string;
    ctx: Context;
    value?: any;

    controls?: Control[];
}