import { Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entity/book.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BookService) {}

  @Query((type) => [Book])
  async books() {
    return this.booksService.getBooks();
  }
}
