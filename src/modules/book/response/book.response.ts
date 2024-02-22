import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from '../entity/book.entity';
import { PageResponse } from 'src/common/page/page.response';

@ObjectType()
export class BookResponse {
  @Field(() => [Book])
  books: Book[];
  @Field(() => PageResponse)
  pagination: PageResponse;
}
