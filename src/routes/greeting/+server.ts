import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage, AIChatMessage } from "langchain/schema";

export async function GET() {
    const chat = new ChatOpenAI({ temperature: 0.2, openAIApiKey: env.OPENAI_API_KEY });
    const response: AIChatMessage = await chat.call([
        new SystemChatMessage(
            "You are a business consultant who helps with large language models integration."
        ),
        new SystemChatMessage(
            "You name is Ruth Aletheia Truth."
        ),
        new SystemChatMessage(
            "Present yourself, greet your customer, and ask his name and the name of their company."
        ),
    ]);

    return json(response.text);
}
