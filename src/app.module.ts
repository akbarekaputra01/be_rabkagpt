import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIController } from './openai/openai.controller'
import { OpenAIService } from './openai/openai.service'
import { PlayhtController } from './playht/playht.controller'
import { PlayhtService } from './playht/playht.service'

@Module({
  imports: [],
  controllers: [OpenAIController, PlayhtController],
  providers: [OpenAIService, PlayhtService],
})
export class AppModule { }
