import { Controller, Post, Body, Res, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PlayhtService } from './playht.service';
import { Response } from 'express';

@Controller('playht')
export class PlayhtController {

  constructor(private readonly playhtService: PlayhtService) { }

  @Post('generate-audio-url')
  async generateAudioUrl(@Body('text') text: string): Promise<{ audioUrl: string }> {
    try {
      const audioUrl = await this.playhtService.generateAudioUrl(text);
      return { audioUrl };
    } catch (error) {
      throw new HttpException('Failed to generate audio URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('download-audio-file')
  async downloadAudioFile(@Body('audioUrl') audioUrl: string, @Body('outputPath') outputPath: string, @Res() res: Response): Promise<void> {
    outputPath = outputPath || "./assets/audio/temp.mp3";
    try {
      await this.playhtService.downloadAudioFile(audioUrl, outputPath);
      res.send({ success: true });
    } catch (error) {
      throw new HttpException('Failed to download audio file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
