import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './auth/auth.module';
import { SettingModule } from './config/setting.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { LikeModule } from './modules/like/like.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    AuthModule,
    SettingModule,
    CategoryModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
