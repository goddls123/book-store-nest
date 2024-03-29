import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Book } from 'src/modules/book/entity/book.entity';

@Entity()
@ObjectType()
export class Ordered {
  constructor(bookId: number, quantity: number, orderId: number) {
    this.bookId = bookId;
    this.quantity = quantity;
    this.orderId = orderId;
  }
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => Order, (d) => d.id)
  order: Order;

  @Field(() => Book)
  @ManyToOne(() => Book, (d) => d.id)
  book: Book;

  @Column({ type: 'int' })
  @Field({ nullable: true })
  bookId: number;

  @Column({ type: 'int' })
  @Field({ nullable: true })
  orderId: number;

  @Column({ type: 'int' })
  @Field({ nullable: true })
  quantity: number;
}
