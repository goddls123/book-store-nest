import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entity/book.entity';
import { BookDto } from './dto/book.args';
import { BookResponse } from './response/book.response';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BookService) {}

  @Query(() => BookResponse)
  async books(@Args() bookDto: BookDto) {
    return await this.booksService.getBooks(bookDto);
  }

  @Query((type) => Book)
  async bookDetail(@Args({ name: 'id' }) id: number): Promise<Book> {
    return await this.booksService.getBook(id);
  }
  @Query((type) => [Book])
  async booksByCategory(
    @Args({ name: 'categoryId' }) categoryId: number,
  ): Promise<Book[]> {
    return await this.booksService.getBooksByCategory(categoryId);
  }
}
