import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.args';
import { isEmail } from 'class-validator';
import { jwtTokenResponse } from './response/jwtToken.response';

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
  @Query(() => User)
  async users() {
    console.log('users');
    return true;
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
