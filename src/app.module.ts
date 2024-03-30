import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIController } from './openai/openai.controller'
import { OpenAIService } from './openai/openai.service'

@Module({
  imports: [],
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class AppModule { }
