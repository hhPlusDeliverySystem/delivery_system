import { Bookmark } from "../bookmark.entity";

export class BookmarkDto {
    id: number;
    userId: number;
    restaurantId: number;
    isBookmarked: boolean;
    constructor(bookmark: Bookmark) {
        this.id = bookmark.id;
        this.userId = bookmark.userId;
        this.restaurantId = bookmark.restaurantId;
        this.isBookmarked = bookmark.isBookmarked;
    }
}