import { Context } from "./context.model";
import { Validator } from "../validators/validator";

export interface Control {
    tag: string;
    id?: string;
    ctx: Context;
    value?: any;
    caption?: string;
    el?: HTMLElement;

    error?: boolean;
    errorMessage?: string;
    validators?: Validator[];
    
    controls?: Control[];
}