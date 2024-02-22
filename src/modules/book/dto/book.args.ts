import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BookDto {
  @Field()
  categoryId: number;
  @Field()
  news: boolean;
  @Field()
  limit: number;
  @Field()
  currentPage: number;
}
