import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { Item } from './item.args';

@InputType()
export class OrderDto {
  @IsInt()
  @Min(1)
  @Field()
  totalQuantity: number;

  @Field(() => String)
  firstBookTitle: string;

  @IsInt()
  @Field(() => Int)
  totalPrice: number;

  @Field(() => [Item])
  items: Item[];
}
