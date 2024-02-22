import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class jwtTokenResponse {
  @Field()
  accessToken: string;
  @Field({ nullable: true })
  refreshToken: string;
  @Field()
  email: string;
  @Field()
  id: number;
}
