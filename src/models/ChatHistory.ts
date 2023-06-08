import { Message } from "./Message";
import { MessageType } from "./MessageType";

const LOCAL_STORAGE_MESSAGES_KEY = 'chatMessages';
const LOCAL_STORAGE_METADATA_KEY = 'chatMetadata';

class ChatHistory {
    private messages: Message[];
    private metadata = {};

    constructor(messages: Message[] = null, metadata = null) {
        if (messages === null || messages.length === 0) {
            messages = [];
        }
        if (metadata === null) {
            metadata = {};
        }

        this.messages = messages;
        this.metadata = metadata;

        this.sync();
    }

    public getMessages(): Message[] {
        return this.messages;
    }

    public addMessage(message: Message) {
        this.messages.push(message);
        this.save();
    }

    public getMetadata(): object {
        return this.metadata;
    }

    public setMetadata(metadat: object) {
        this.metadata = metadat;
    }

    public isEmpty(): boolean {
        return this.messages.length === 0;
    }

    public isAITurn(): boolean {
        if (this.messages.length === 0) {
            return true;
        }
        else {
            return this.messages[this.messages.length - 1].type === MessageType.HumanMessage;
        }
    }

    public isHumanTurn(): boolean {
        return !this.isAITurn();
    }

    public sync() {
        if (typeof localStorage === 'undefined') {
            return;
        }

        let encodedMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
        if (encodedMessages === '' || encodedMessages === null) {
            encodedMessages = '[]';
        }
        const decodedMessages: [] = JSON.parse(encodedMessages);

        this.messages = [];
        for (const item: [] of decodedMessages) {
            this.messages.push(new Message(item['text'], item['type']));
        }

        let encodedMetadata = localStorage.getItem(LOCAL_STORAGE_METADATA_KEY);
        if (encodedMetadata === '' || encodedMetadata === null) {
            encodedMetadata = '{}';
        }
        this.metadata = JSON.parse(encodedMetadata);
    }

    public reset() {
        this.messages = [];
        localStorage.removeItem(LOCAL_STORAGE_MESSAGES_KEY);
        localStorage.removeItem(LOCAL_STORAGE_METADATA_KEY);
    }

    private save() {
        if (typeof localStorage === 'undefined') {
            return;
        }

        localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(this.messages));
        localStorage.setItem(LOCAL_STORAGE_METADATA_KEY, JSON.stringify(this.metadata));
    }
}

export { ChatHistory };
