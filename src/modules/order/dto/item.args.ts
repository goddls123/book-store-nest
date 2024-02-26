import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Item {
  @Field(() => Int)
  cartId: number;
  @Field(() => [Int])
  bookId: number;
  @Field(() => [Int])
  quantity: number;
}
