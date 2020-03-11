import { currencyFormat } from "./currency-format.pipe";
export class PipeFactory {
    constructor() {
        this.currencyFormat = currencyFormat;
    }
}
