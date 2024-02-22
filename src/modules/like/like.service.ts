import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly bookRepository: Repository<Like>,
  ) {}

  async addLike(likedBookId: number): Promise<boolean> {
    const like = new Like();
    like.likedBookId = likedBookId;

    await this.bookRepository.save(like);
    return true;
  }

  async deleteLike(likedBookId: number): Promise<boolean> {
    await this.bookRepository.delete({ likedBookId });
    return true;
  }
}
