import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeliveryDto {
  @Field(() => String)
  address: string;

  @Field(() => String)
  receiver: string;

  @Field(() => String)
  contact: string;
}
