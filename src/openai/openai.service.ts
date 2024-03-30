import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
    private openAI: OpenAI;
    private logger = new Logger(OpenAIService.name);

    private conversationHistory: {
        role: 'function' | 'user' | 'system' | 'assistant';
        content: string;
        name: string;
    }[] = [];

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('An error occurred at OpenAI API Key');
        }
        this.openAI = new OpenAI({
            apiKey: apiKey,
        });
    }

    async ChatGPT(content: string) {
        try {
            this.conversationHistory.push({
                role: 'user',
                content: content,
                name: 'user_name',
            });

            const chatCompletion = await this.openAI.chat.completions.create({
                messages: [
                    { role: 'system', content: 'you are good assistant', name: 'system_name' },
                    ...this.conversationHistory
                ],
                model: 'gpt-3.5-turbo'
            });

            const assistantResponse = chatCompletion.choices[0].message.content;

            this.conversationHistory.push({
                role: 'assistant',
                content: assistantResponse,
                name: 'assistant_name',
            });

            return {
                user: content,
                assistant: assistantResponse
            };
        } catch (error) {
            this.logger.error(`Error while chatting with GPT: ${error.message}`);
            throw new Error('Failed to chat with GPT');
        }
    }
}
