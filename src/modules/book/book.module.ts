import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BooksResolver } from './book.resolver';
import { Book } from './entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthModule)],
  providers: [BookService, BooksResolver],
})
export class BookModule {}
