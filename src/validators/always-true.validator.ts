import { Context } from "../model/context.model";
import { Control } from "../model/control.model";
import { Validator } from "./validator";

export class AlwaysTrueValidator extends Validator{
    validate(_ctx: Context, _ctrl: Control): boolean {
        return true;
    }

}