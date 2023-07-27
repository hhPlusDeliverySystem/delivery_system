import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackService {

  private readonly slackApiToken: string;
  private readonly slackChannelId: string;

  constructor(private httpService: HttpService) {
    this.slackApiToken = process.env.SLACK_API_TOKEN;
    this.slackChannelId = process.env.SLACK_CHANNEL_ID;
  }

  async postMessageToSlack(text: string): Promise<any> {
    const url = 'https://slack.com/api/chat.postMessage';
    const data = {
      channel: this.slackChannelId,
      text: text,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.slackApiToken,
    };

    try {
      const response = await this.httpService
        .post(url, data, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Failed to post message to Slack.');
    }
  }
}