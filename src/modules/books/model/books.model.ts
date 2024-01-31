import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'book' })
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  isbn?: string;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  img: string;

  @Field({ nullable: true })
  form?: string;

  @Field({ nullable: true })
  pages?: number;

  @Field({ nullable: true })
  contents?: string;

  @Field({ nullable: true })
  detail?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  author?: string;

  @Field()
  price: string;

  @Field({ nullable: true })
  likes?: number;

  @Field({ nullable: true })
  pubDate?: Date;
}
