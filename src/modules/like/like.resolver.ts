import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Like } from './entity/like.entity';
import { LikeService } from './like.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtGuard)
  @Mutation(() => Boolean)
  async addLike(
    @Args({ name: 'likedBookId' }) likedBookId: number,
    @JwtToken() user,
  ): Promise<boolean> {
    return this.likeService.addLike(likedBookId, user.id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Boolean)
  async deleteLike(
    @Args({ name: 'likedBookId' }) likedBookId: number,
    @JwtToken() user,
  ): Promise<boolean> {
    return this.likeService.deleteLike(likedBookId, user.id);
  }
}
