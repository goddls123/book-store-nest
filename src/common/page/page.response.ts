import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageResponse {
  @Field((type) => Number)
  totalCount: number;
  @Field((type) => Number)
  currentPage: number;
}
