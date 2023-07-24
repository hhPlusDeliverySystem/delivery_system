import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { loggers } from 'winston';
import { SuccessResponse } from '../successResponse';
import { ReviewDto } from './dto/reviewDto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoggerService } from 'src/utils/logger.service';
import { ReviewRequest } from './dto/reviewRequest';

@Controller('review')
export class ReviewController {
  constructor(
    private reviewService: ReviewService,
    private readonly loggerService: LoggerService,
  ) { }

  @Post('')
  @ApiOperation({
    summary: '리뷰 등록 api',
    description: '리뷰 등록',
  })
  async createReview(@Body() request: ReviewRequest) {
    this.loggerService.infoWithContext('createReview', request);
    await this.reviewService.createReview(request);
    return new SuccessResponse(1000, '리뷰가 등록되었습니다.');
  }

  @Get('/:reviewId')
  @ApiOperation({ summary: '리뷰 조회 api', description: '리뷰 조회' })
  async getReview(@Param('reviewId') reviewId: number): Promise<ReviewDto> {
    this.loggerService.infoWithContext('getReview', reviewId.toString);
    const review: ReviewDto = await this.reviewService.findReviewById(reviewId);
    return review;
  }
}