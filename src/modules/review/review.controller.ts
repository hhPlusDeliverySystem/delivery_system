import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { loggers } from 'winston';
import { SuccessResponse } from '../successResponse';
import { ReviewDto } from './dto/reviewDto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('review')
export class ReviewController {
  constructor(
    private reviewService: ReviewService,
    // private readonly logger: Logger,
  ) { }

  @Post('')
  @ApiOperation({
    summary: '리뷰 등록 api',
    description: '리뷰 등록',
  })
  async createReview(@Body() body) {
    // this.logger.log('createReview START', ReviewController.name);
    this.reviewService.createReview(body.deliveryId, body.userId, body.content);
    // this.logger.log('createReview END', ReviewController.name);
    return new SuccessResponse(1000, '리뷰가 등록되었습니다.');
  }
}