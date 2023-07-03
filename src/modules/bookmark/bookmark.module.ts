import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bookmark } from "./bookmark.entity";
import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";


@Module({
  imports: [TypeOrmModule.forFeature([Bookmark]),],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule { };