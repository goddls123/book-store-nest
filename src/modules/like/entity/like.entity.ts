import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/modules/book/entity/book.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
@ObjectType({ description: 'Like' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, (d) => d.id)
  @Field(() => ID)
  userId: number;

  @ManyToOne(() => Book, (d) => d.id)
  @Field(() => ID)
  likedBookId: number;
}
