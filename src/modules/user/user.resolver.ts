import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args({ name: 'email' }) email: string) {
    console.log(email);
    return this.userService.getUser(email);
  }

  @Mutation((type) => Boolean)
  async join(@Args() userDto: UserDto) {
    console.log(userDto);
    return this.userService.join(userDto);
  }

  @Mutation((type) => Boolean)
  async login(@Args() userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Mutation((type) => Boolean)
  async resetPassword(@Args() userDto: UserDto) {
    return this.userService.join(userDto);
  }
}
