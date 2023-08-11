import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OwnerDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @Column()
  orderStatus: string;
}
