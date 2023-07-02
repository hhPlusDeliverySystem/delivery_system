import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export @Entity({ name: 'order' })
class order {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'order_id' })
    public orderId: string;


    @Column({ name: 'order_status' })
    public orderStatus: string;

    @Column()
    public quantity: number;

    @Column({ name: 'total_price' })
    public totalPrice: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

}