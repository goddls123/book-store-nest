import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, Min } from 'class-validator';

@ArgsType()
export class BookDto {
  @IsInt()
  @Field({ nullable: true })
  categoryId: number;
  @IsBoolean()
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
