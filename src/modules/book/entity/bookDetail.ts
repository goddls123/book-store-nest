import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from './book.entity';
import { Category } from 'src/modules/category/entity/category.entity';

@ObjectType()
export class BookDetail extends Book {
  @Field(() => Category)
  category: Category;

  @Field(() => Boolean, { nullable: true })
  liked: boolean;
}
