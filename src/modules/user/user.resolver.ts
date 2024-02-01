import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((type) => User)
  async user(@Args({ name: 'email' }) email: string) {
    return this.userService.getUser(email);
  }

  @Mutation((type) => Boolean)
  async join(
    @Args({ name: 'email' }) email: string,
    @Args({ name: 'password' }) password: string,
  ) {
    return this.userService.join(email, password);
  }

  @Mutation((type) => Boolean)
  async login() {
    return this.userService.login();
  }

  @Mutation((type) => Boolean)
  async resetPassword(
    @Args({ name: 'email' }) email: string,
    @Args({ name: 'password' }) password: string,
  ) {
    return this.userService.join(email, password);
  }
}
