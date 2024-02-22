import { Args, Query, Resolver } from '@nestjs/graphql';
import { Like } from './entity/like.entity';
import { LikeService } from './like.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => Boolean)
  async addLike(
    @Args({ name: 'likedBookId' }) likedBookId: number,
  ): Promise<boolean> {
    return this.likeService.addLike(likedBookId);
  }

  @Query(() => Boolean)
  async deleteLike(
    @Args({ name: 'likedBookId' }) likedBookId: number,
  ): Promise<boolean> {
    return this.likeService.deleteLike(likedBookId);
  }
}
