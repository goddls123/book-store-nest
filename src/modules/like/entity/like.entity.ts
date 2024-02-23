import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entity/book.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('likes')
@ObjectType({ description: 'Like' })
export class Like {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  likedBook: Book;

  @PrimaryColumn({ type: 'int' })
  @Field(() => Number)
  userId: number;

  @PrimaryColumn({ type: 'int' })
  @Field(() => Number)
  likedBookId: number;
}
