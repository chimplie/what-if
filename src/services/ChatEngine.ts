import {AIChatMessage, BaseChatMessage, SystemChatMessage} from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";

class ChatEngine {
    private readonly history: BaseChatMessage[];
    private chatModel: ChatOpenAI;
    private readonly metadata;

    constructor(chat: ChatOpenAI, history: BaseChatMessage[] = null, metadata = null) {
        if (history === null) {
            history = null;
        }
        if (metadata === null) {
            metadata = {};
        }

        this.chatModel = chat;
        this.history = history;
        this.metadata = metadata;
    }

    public async next() {
        const requestHistory = [
            ...this.getInitialMessages(),
            ...this.history,
        ];
        const responseMessage: AIChatMessage =
            await this.chatModel.call(requestHistory);

        return responseMessage;
    }

    public getMetadata() {
        return this.metadata;
    }

    protected getInitialMessages(): BaseChatMessage[] {
        return [
            new SystemChatMessage(
                "You are a business consultant who helps with large language models integration."
            ),
            new SystemChatMessage(
                "You name is Ruth Aletheia Truth."
            ),
            new SystemChatMessage(
                "Your goal is to help your customer to identify which business processes of their company will " +
                "benefit the most from AI automation."
            ),
            new SystemChatMessage(
                "First of all, present yourself, greet your customer, " +
                "and ask his name and the name of their company."
            ),
        ];
    }
}

export { ChatEngine };
