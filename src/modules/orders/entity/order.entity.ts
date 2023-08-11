import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'order' })
export class order {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'user_name'})
    public userName: string;

    @Column({ name: 'order_status' })
    public orderStatus: string;

    @Column()
    public quantity: number;

    @Column({ name: 'total_price' })
    public totalPrice: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    
}