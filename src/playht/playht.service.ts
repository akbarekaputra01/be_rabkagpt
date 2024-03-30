import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as PlayHTAPI from 'playht';
import * as fs from 'fs';

@Injectable()
export class PlayhtService {
  private logger = new Logger(PlayhtService.name);

  constructor() {
    const apiKey = process.env.PLAYHT_API_KEY;
    const userId = process.env.PLAYHT_USER_ID;
    if (!apiKey || !userId) {
      throw new Error('An error occurred at PlayHT API Key or User ID.');
    }
    PlayHTAPI.init({
      apiKey: apiKey,
      userId: userId,
    });
  }

  async generateAudioUrl(sentence: string): Promise<string> {
    try {
      const response = await PlayHTAPI.generate(sentence, {
        voiceId:
          's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
        outputFormat: 'mp3',
        voiceEngine: 'PlayHT2.0',
        sampleRate: 44100,
        speed: 1,
      });
      return response.audioUrl;
    } catch (error) {
      this.logger.error(`Failed to generate audio URL: ${error.message}`);
      throw new Error('Failed to generate audio URL');
    }
  }

  async downloadAudioFile(
    audioUrl: string,
    outputPath: string,
  ): Promise<void> {
    try {
      const writer = fs.createWriteStream(outputPath);
      const response = await axios({
        method: 'get',
        url: audioUrl,
        responseType: 'stream',
      });
      response.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      this.logger.error(`Failed to download audio file: ${error.message}`);
      throw new Error('Failed to download audio file');
    }
  }
}
