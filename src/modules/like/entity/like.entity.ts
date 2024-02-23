import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entity/book.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
@ObjectType({ description: 'Like' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  likedBook: Book;

  @Column({ type: 'int' })
  @Field(() => Number)
  userId: number;

  @Column({ type: 'int' })
  @Field(() => Number)
  likedBookId: number;
}
