import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';
import { OrderDto } from '../dto/order.args';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  userId: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  bookTitle: string;

  @Field(() => Delivery)
  @ManyToOne(() => Delivery, (d) => d.id)
  delivery: Delivery;

  @Column({ type: 'int' })
  @Field(() => Int)
  deliveryId: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  totalQuantity: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  totalPrice: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  setOrder(delveryId: number, orderDto: OrderDto, userId: number) {
    this.deliveryId = delveryId;
    this.totalPrice = orderDto.totalPrice;
    this.totalQuantity = orderDto.totalQuantity;
    this.userId = userId;
    this.bookTitle = orderDto.firstBookTitle;
  }
}
