import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.args';
import { isEmail } from 'class-validator';
import { jwtTokenResponse } from './response/jwtToken.response';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User)
  async user(@Args({ name: 'email' }) email: string) {
    if (isEmail(email)) {
      return this.userService.getUser(email);
    }
    throw new Error('must be email');
  }
  @UseGuards(JwtGuard)
  @Query(() => [User])
  async users(@JwtToken() user) {
    console.log(user);
    return this.userService.getUsers();
  }
  @Mutation((type) => User)
  async join(@Args() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }
  @Mutation((type) => jwtTokenResponse)
  async login(@Args() userDto: UserDto) {
    return this.userService.login(userDto);
  }
  @Mutation((type) => Boolean)
  async resetPassword(@Args() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
