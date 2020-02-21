import { Message } from "./message.model";

export interface Page {
    controls: any[];
    sendMessage(message: Message): void;
}
