import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "content" })
  content: string;

  @Column("int", { name: "deliveryId" })
  deliveryId: number;

  @Column("int", { name: "userId" })
  userId: number;

  constructor(content: string, deliveryId: number, userId: number) {
    this.content = content;
    this.deliveryId = deliveryId;
    this.userId = userId;
  }

}