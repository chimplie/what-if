import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { ChatOpenAI } from "langchain/chat_models/openai";
import {AIChatMessage, BaseChatMessage, HumanChatMessage} from "langchain/schema";
import {MessageType} from "../../models";
import {ChatEngine} from "../../services/ChatEngine";

function parseMessages(items: []): BaseChatMessage[] {
    const messages = [];

    for (const item of items) {
        switch (item['type']) {
            case MessageType.AIMessage:
                messages.push(new AIChatMessage(item['text']));
                break;
            case MessageType.HumanMessage:
                messages.push(new HumanChatMessage(item['text']));
                break;
            case MessageType.SystemMessage:
                messages.push(new AIChatMessage(item['text']));
                break;
        }
    }

    return messages;
}

export async function POST({ request }) {
    const data = await request.json();
    const messages = parseMessages(data['messages']);
    const metadata = data['metadata'];

    const chatModel = new ChatOpenAI({ temperature: 0.2, openAIApiKey: env.OPENAI_API_KEY });
    const engine = new ChatEngine(chatModel, messages, metadata);

    const response: AIChatMessage = await engine.next();

    return json({
        message: response.text,
        metadata: engine.getMetadata()
    });
}
