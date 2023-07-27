import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/utils/logger.service';
import { Request, Response } from 'express';
import { SlackService } from 'src/utils/slack.service';
import { HttpService } from '@nestjs/axios';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private slackService: SlackService;
  constructor() {
    this.slackService = new SlackService(new HttpService()); // Manually create an instance of SlackService
  }

  private logger = new Logger();

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    this.logger.error(
      `${req.ip} ${req.originalUrl} ${req.method} ${exception}`,
    );

    res.status(status).json({
      timestamp: new Date().toISOString(),
      path: req.url,
      error,
    });

    const slackResponse = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
      error: {
        message: exception.message,
        error: exception.name,
      },
    };

    const responseJson = JSON.stringify(slackResponse, null, 2);
    // if (!(status >= 400 && status < 500)) {
    await this.slackService.postMessageToSlack(responseJson);
    // }
  }

  catchUnknow(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    // const error = exception.getResponse() as
    //   | string
    //   | { error: string; statusCode: number; message: string | string[] };

    this.logger.error(
      `${req.ip} ${req.originalUrl} ${req.method} ${exception}`,
    );

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}

function exception(
  exception: any,
  unknown: any,
  host: any,
  ArgumentsHost: any,
) {
  throw new Error('Function not implemented.');
}
function catchUnknow(
  exception: (
    exception: any,
    unknown: any,
    host: any,
    ArgumentsHost: any,
  ) => void,
  unknown: any,
  host: any,
  ArgumentsHost: any,
) {
  throw new Error('Function not implemented.');
}
