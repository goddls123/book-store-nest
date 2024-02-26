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

  async getBooks(bookDto: BookDto) {
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

    // console.log(books);
    const pagination = new PageResponse();
    pagination.totalCount = bookCount;
    pagination.currentPage = bookDto.currentPage;

    return {
      books,
      pagination,
    };
  }
  async getBook(bookId: number, user) {
    const book = await this.bookRepository
      .createQueryBuilder('a')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from(Like, 'likes')
          .where(`liked_book_id=${bookId}`);
      }, 'a_likes')
      .leftJoinAndSelect('a.category', 'category')
      .where(`a.id = ${bookId}`)
      .getOne();
    // console.log(book);
    return book;
  }
  async getBooksByCategory(categoryId: number): Promise<Book[]> {
    return await this.bookRepository.findBy({ categoryId });
  }
}
