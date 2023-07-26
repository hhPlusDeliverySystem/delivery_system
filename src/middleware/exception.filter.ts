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
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      error: {
        message: exception.message,
        error: exception.name
      },
    };

    const responseJson = JSON.stringify(slackResponse);
    if (status >= 400 && status < 500) {
      // Handle BadRequest
      await this.slackService.postMessageToSlack(responseJson);
      // console.log("this.slackService.postMessageToSlack('BadRequest');")
    } else {
      // Handle Internal Server Error
      await this.slackService.postMessageToSlack('InternalServerError');
    }
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
      path: req.url
    });

  }
}