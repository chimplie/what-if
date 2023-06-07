import { Message } from "./Message";
import { MessageType } from "./MessageType";

const LOCAL_STORAGE_KEY = 'chatHistory';

class ChatHistory {
    private history: Message[];

    constructor(history: Message[] = null) {
        if (history === null || history.length === 0) {
            this.history = [];
        }
        this.load();
    }

    public getHistory(): Message[] {
        return this.history;
    }

    public isEmpty(): boolean {
        return this.history.length === 0;
    }

    public isAITurn(): boolean {
        if (this.history.length === 0) {
            return true;
        }
        else {
            return this.history[this.history.length - 1].type === MessageType.HumanMessage;
        }
    }

    public isHumanTurn(): boolean {
        return !this.isAITurn();
    }

    public add(message: Message) {
        this.history.push(message);
        this.save();
    }

    public reset() {
        this.history = [];
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    private save() {
        if (typeof localStorage === 'undefined') {
            return;
        }

        const encoded = JSON.stringify(this.history);
        localStorage.setItem(LOCAL_STORAGE_KEY, encoded);
    }

    private load() {
        if (typeof localStorage === 'undefined') {
            return;
        }

        this.history = [];

        const encoded = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (encoded === '' || encoded === null) {
            return
        }
        const decoded: [] = JSON.parse(encoded);

        for (const item: [] of decoded) {
            this.history.push(new Message(item['text'], item['type']));
        }
    }
}

export { ChatHistory };
