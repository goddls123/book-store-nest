import { Logger, Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './auth/auth.module';
import { SettingModule } from './config/setting.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { LikeModule } from './modules/like/like.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    AuthModule,
    SettingModule,
    CategoryModule,
    LikeModule,
    CartModule,
    OrderModule,
  ],
  providers: [Logger],
})
export class AppModule {}
