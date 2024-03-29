import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entity/book.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (d) => d.id)
  user: User;

  @Field(() => Book)
  @ManyToOne(() => Book, (d) => d.id)
  book: Book;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  bookId: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  quantity: number;
}
