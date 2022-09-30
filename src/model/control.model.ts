import { Context } from "./context.model";
import { Validator } from "../validators/validator";

export interface Control {
    tag: string;
    id?: string;
    ctx: Context;
    value?: string|object|null|undefined;
    caption?: string;
    el?: HTMLElement;

    error?: boolean;
    errorMessage?: string;
    validators?: Validator[];
    
    controls?: Control[];
}