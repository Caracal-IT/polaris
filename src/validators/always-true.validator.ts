import { Validator } from "./validator";

export class AlwaysTrueValidator extends Validator{
    validate(): boolean {
        return true;
    }

}