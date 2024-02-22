import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('likes')
@ObjectType({ description: 'Like' })
export class Like {
  @PrimaryColumn({ type: 'int' })
  @Field(() => ID)
  userId: number;

  @PrimaryColumn({ type: 'int' })
  @Field(() => ID)
  likedBookId: number;
}
