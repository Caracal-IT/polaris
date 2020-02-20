import { Context } from "../model/context.model";
import { Control } from "../model/control.model";

export abstract class Validator {
    constructor(public name: string) { }
    abstract validate(context: Context, control: Control, config: any): boolean;
}