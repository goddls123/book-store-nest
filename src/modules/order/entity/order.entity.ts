import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  userId: number;

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

  setOrder(delveryId: number, totalPrice: number, totalQuantity: number) {
    this.deliveryId = delveryId;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
  }
}
