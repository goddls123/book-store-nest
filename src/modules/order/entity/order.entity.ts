import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'int' })
  @Field()
  userId: number;

  @ManyToOne(() => Delivery, (d) => d.id)
  category: Delivery;

  @Column({ type: 'int' })
  @Field()
  deliveryId: number;

  @Column({ type: 'int' })
  @Field()
  totalQuantity: number;

  @Column({ type: 'int' })
  @Field()
  totalPrice: number;

  @Column()
  @Field()
  createdAt: Date;
}
