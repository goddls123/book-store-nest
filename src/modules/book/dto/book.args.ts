import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class BookDto {
  @Field({ nullable: true })
  categoryId: number;
  @Field({ nullable: true })
  news: boolean;
  @IsInt()
  @Field()
  limit: number;
  @IsInt()
  @Min(0)
  @Field()
  currentPage: number;
}
