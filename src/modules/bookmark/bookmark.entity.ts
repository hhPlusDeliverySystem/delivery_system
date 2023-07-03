import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bookmark {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @Column()
  isBookmarked: boolean;

  static create(
    userId: number,
    restaurantId: number,
    isBookmared: boolean
    ) : Bookmark {
      const bookmark = new Bookmark();
      bookmark.userId = userId;
      bookmark.restaurantId = restaurantId;
      bookmark.isBookmarked = isBookmared;
      return bookmark;
  }
}
