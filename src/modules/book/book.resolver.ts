import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entity/book.entity';
import { BookDto } from './dto/book.args';
import { BookResponse } from './response/book.response';
import { BookDetail } from './entity/bookDetail';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/auth/guard/user.guard';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BookService) {}

  @Query(() => BookResponse)
  async books(@Args() bookDto: BookDto): Promise<any> {
    return await this.booksService.getBooks(bookDto);
  }

  @UseGuards(UserGuard)
  @Query(() => BookDetail)
  async bookDetail(
    @Args({ name: 'id' }) id: number,
    @JwtToken() user,
  ): Promise<Book> {
    return await this.booksService.getBook(id, user);
  }

  @Query(() => [Book])
  async booksByCategory(
    @Args({ name: 'categoryId' }) categoryId: number,
  ): Promise<Book[]> {
    return await this.booksService.getBooksByCategory(categoryId);
  }
}
