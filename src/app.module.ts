import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './auth/auth.module';
import { SettingModule } from './config/setting.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, BookModule, AuthModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
