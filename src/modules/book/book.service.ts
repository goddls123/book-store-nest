import { Injectable } from '@nestjs/common';
import { Book } from './model/book.model';

@Injectable()
export class BookService {
  private books: Book[] = [];
  constructor() {}

  getBooks() {
    return this.books;
  }
}
