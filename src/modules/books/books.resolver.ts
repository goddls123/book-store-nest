import { Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './model/books.model';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query((type) => [Book])
  async books() {
    return this.booksService.getBooks();
  }
}
