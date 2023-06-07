import { MessageType } from './MessageType';

class Message {
    readonly type: MessageType;
    readonly text: string;

    constructor(text: string, type: MessageType) {
        this.text = text;
        this.type = type;
    }
}

export { Message };
