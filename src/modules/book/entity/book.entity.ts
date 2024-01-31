import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'book' })
export class Book {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: true })
  title: string;

  @Column()
  @Field({ nullable: true })
  isbn?: string;

  @Column()
  @Field(() => ID)
  categoryId: string;

  @Column()
  @Field({ nullable: true })
  img: string;

  @Column()
  @Field({ nullable: true })
  form?: string;

  @Column()
  @Field((type) => Int, { nullable: true })
  pages?: number;

  @Column()
  @Field({ nullable: true })
  contents?: string;

  @Column()
  @Field({ nullable: true })
  detail?: string;

  @Column()
  @Field({ nullable: true })
  summary?: string;

  @Column()
  @Field({ nullable: true })
  author?: string;

  @Column()
  @Field((type) => Int)
  price: string;

  @Column()
  @Field((type) => Int, { nullable: true })
  likes?: number;

  @Column()
  @Field({ nullable: true })
  pubDate?: Date;
}
