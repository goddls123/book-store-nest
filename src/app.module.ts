import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './auth/auth.module';
import { SettingModule } from './config/setting.module';

@Module({
  imports: [UsersModule, BooksModule, AuthModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
