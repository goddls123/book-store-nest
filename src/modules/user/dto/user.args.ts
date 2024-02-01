import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserDto {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty({ message: '유효하지 않는 아이디와 비밀번호입니다.' })
  password!: string;
}
