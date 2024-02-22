import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BooksResolver } from './book.resolver';
import { Book } from './entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BooksResolver],
})
export class BookModule {}
