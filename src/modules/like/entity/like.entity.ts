import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Like {
  @Column({ type: 'int' })
  @Field(() => ID)
  userId: number;

  @Column({ type: 'int' })
  @Field(() => ID)
  likedBookId: number;
}
