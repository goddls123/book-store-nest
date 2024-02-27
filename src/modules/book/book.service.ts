import { Injectable } from '@nestjs/common';
import { Book } from './entity/book.entity';
import { BookDto } from './dto/book.args';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PageResponse } from 'src/common/page/page.response';
import { Like } from '../like/entity/like.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks(bookDto: BookDto): Promise<any> {
    const where = {};

    if (bookDto.categoryId) {
      where['categoryId'] = bookDto.categoryId;
    }
    if (bookDto.news) {
      where['pubDate'] = Between(
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date(),
      );
    }
    const [books, bookCount] = await this.bookRepository.findAndCount({
      where,
      skip: bookDto.currentPage - 1,
      take: bookDto.limit,
    });

    const pagination = new PageResponse();
    pagination.totalCount = bookCount;
    pagination.currentPage = bookDto.currentPage;

    return {
      books,
      pagination,
    };
  }
  async getBook(bookId: number, user): Promise<Book> {
    const qb = this.bookRepository
      .createQueryBuilder('a')
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from(Like, 'likes')
          .where(`liked_book_id=${bookId}`);
      }, 'likes');

    if (user?.id) {
      qb.addSelect(
        `(SELECT EXISTS (SELECT * FROM likes WHERE user_id = ${user.id} AND liked_book_id = ${bookId} ))`,
        'liked',
      );
    }

    return await qb
      .leftJoinAndSelect('a.category', 'category')
      .where(`a.id = ${bookId}`)
      .getRawOne();
  }

  async getBooksByCategory(categoryId: number): Promise<Book[]> {
    return await this.bookRepository.findBy({ categoryId });
  }
}
