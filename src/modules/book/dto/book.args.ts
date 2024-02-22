import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BookDto {
  @Field({ nullable: true })
  categoryId: number;
  @Field({ nullable: true })
  news: boolean;
  @Field()
  limit: number;
  @Field()
  currentPage: number;
}
