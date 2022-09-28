import { Context } from "../model/context.model";
import { Control } from "../model/control.model";
import { Validator } from "./validator";

export class AlwaysFalseValidator extends Validator{
    validate(_ctx: Context, _ctrl: Control): boolean {
        return false;
    }

}