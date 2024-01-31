import { Injectable } from '@nestjs/common';
import { Book } from './model/books.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  constructor() {}

  getBooks() {
    return this.books;
  }
}
