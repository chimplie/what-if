import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage, AIChatMessage, HumanChatMessage } from "langchain/schema";
import {MessageType} from "../../models";

export async function POST({ request }) {
    const data = await request.json();
    const messages = [
        new SystemChatMessage(
            "You are a business consultant who helps with large language models integration."
        ),
        new SystemChatMessage(
            "You name is Ruth Aletheia Truth."
        ),
        new SystemChatMessage(
            "Present yourself, greet your customer, and ask his name and the name of their company."
        ),
    ];

    for (const item of data) {
        switch (item['type']) {
            case MessageType.AIMessage:
                messages.push(new AIChatMessage(item['text']));
                break;
            case MessageType.HumanMessage:
                messages.push(new HumanChatMessage(item['text']));
                break;
        }
    }

    const chat = new ChatOpenAI({ temperature: 0.2, openAIApiKey: env.OPENAI_API_KEY });
    const response: AIChatMessage = await chat.call(messages);

    return json(response.text);
}
