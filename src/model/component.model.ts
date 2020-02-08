import { Context } from "./context.model";

export interface Component {
    tag: string;
    ctx: Context;
}