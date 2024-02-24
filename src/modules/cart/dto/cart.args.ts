import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class CartDto {
  @Field()
  @IsNumber()
  quantity: number;

  @Field()
  @IsNumber()
  bookId: number;
}
