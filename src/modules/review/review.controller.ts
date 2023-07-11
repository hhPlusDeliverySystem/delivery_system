import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../successResponse';
import { ReviewDto } from './dto/reviewDto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }

  @Post('')
  @ApiOperation({
    summary: '리뷰 등록 api',
    description: '리뷰 등록',
  })
  async createReview(@Body() body){
    // this.reviewService.createReview(body.deliveryId, body.userId, body.content);
    return new SuccessResponse(1000, '리뷰가 등록되었습니다.');
}}