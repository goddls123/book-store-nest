import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.args';
import { isEmail } from 'class-validator';
import { jwtTokenResponse } from './response/jwtToken.response';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';

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
  @Query(() => [User])
  async users() {
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

  @UseGuards(JwtRefreshGuard)
  @Mutation((type) => jwtTokenResponse)
  async reissiuredToken(@JwtToken() user): Promise<jwtTokenResponse> {
    return user;
  }

  @UseGuards(JwtGuard)
  @Mutation((type) => Boolean)
  async logOut(@JwtToken() user): Promise<boolean> {
    return this.userService.removeRefreshToken(user.email);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args() userDto: UserDto): Promise<boolean> {
    return this.userService.updatePassword(userDto);
  }
}
