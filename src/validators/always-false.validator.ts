import { Validator } from "./validator";

export class AlwaysFalseValidator extends Validator{
    validate(): boolean {
        return false;
    }

}