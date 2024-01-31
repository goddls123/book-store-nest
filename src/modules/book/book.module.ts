import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BooksResolver } from './book.resolver';

@Module({
  providers: [BookService, BooksResolver],
})
export class BookModule {}
