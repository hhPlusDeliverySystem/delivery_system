import { Controller, Logger, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,) { }

  @Get()
  getHello(): string {
    this.logger.log({
      level: 'info',
      message: 'Hello distributed log files!'
    });
    this.logger.warn('Hello again warn logs');
    return this.appService.getHello();
  }
}
