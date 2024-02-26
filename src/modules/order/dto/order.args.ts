import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Delivery } from '../entity/delivery.entity';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class OrderDto {
  @IsInt()
  @Min(1)
  @Field()
  totalQuantity: number;

  @Field(() => [Int])
  items: number[];

  @Field(() => String)
  firstBookTitle: string;

  @IsInt()
  @Field(() => Int)
  totalPrice: number;

  @Field(() => Delivery)
  delivery: Delivery;
}
