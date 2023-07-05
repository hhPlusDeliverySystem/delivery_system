import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Bookmark } from "./bookmark.entity"


@Injectable()
export class BookmarkRepository {

  constructor(
    @InjectRepository(Bookmark) private bookmarkModel: Repository<Bookmark>,
  ) { }

  async save(bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarkModel.save(bookmark);
  }

  async findByUserIdAndRestaurantId(userId: number, restaurantId: number) : Promise<Bookmark> {
    return await this.bookmarkModel.findOne({
        where: { userId : userId, restaurantId: restaurantId }
    });
  }
} 