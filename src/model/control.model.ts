import { Context } from "./context.model";
import { Validator } from "../validators/validator";

export interface Control {
    tag: string;
    id?: string;
    ctx: Context;
    value?: any;
    el?: HTMLElement;

    error?: boolean;
    errorMessage?: string;
    validators?: Array<Validator>;
    
    controls?: Control[];
}