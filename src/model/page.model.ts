import { Control } from "./control.model";
import { Message } from "./message.model";

export interface Page {
    controls: Control[];
    sendMessage(message: Message): void;
}
