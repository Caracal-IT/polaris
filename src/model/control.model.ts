import { Context } from "./context.model";

export interface Control {
    tag: string;
    id?: string;
    ctx: Context;
    value?: any;

    error?: boolean;
    errorMessage?: string;
    
    controls?: Control[];
}