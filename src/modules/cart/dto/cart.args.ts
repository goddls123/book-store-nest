import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class CartDto {
  @Field()
  @IsInt()
  quantity: number;

  @Field()
  @IsInt()
  bookId: number;
}
