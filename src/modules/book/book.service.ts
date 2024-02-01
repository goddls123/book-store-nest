import { Injectable } from '@nestjs/common';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {
  private books: Book[] = [];
  constructor() {}

  getBooks() {
    return this.books;
  }
}
