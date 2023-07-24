import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryStatus } from './deliveryStatus';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  departureTime: Date;

  @Column({ nullable: true })
  arrivalTime: Date;

  @Column({
    type: 'varchar',
    length: 20
  })
  deliveryStatus: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  departureMessage: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  arrivalMessage: string;

  @Column({ nullable: true })
  departureAlimToUser: boolean;

  @Column({ nullable: true })
  arrivalAlimToUser: boolean;

  @Column({ nullable: true })
  arrivalAlimToOwner: boolean;


}
