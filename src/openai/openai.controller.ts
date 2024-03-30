import {Controller, Post, Body} from '@nestjs/common'
import { OpenAIService} from './openai.service'

@Controller('openai')
export class OpenAIController {
    constructor(private readonly openAIService: OpenAIService) {}

    @Post('chatgpt')
    async talkToGPT (@Body ('content') content: string){
        return this.openAIService.ChatGPT(content);
    }
}