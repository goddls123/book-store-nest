import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field({ nullable: true })
  title: string;

  @Column()
  @Field({ nullable: true })
  isbn?: string;

  @Column()
  @Field(() => ID)
  categoryId: number;

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
  description?: string;

  @Column()
  @Field({ nullable: true })
  summary?: string;

  @Column()
  @Field({ nullable: true })
  author?: string;

  @Column()
  @Field((type) => Int)
  price: string;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  likes?: number;

  @Column()
  @Field({ nullable: true })
  pubDate?: Date;
}
