import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, CartResolver],
})
export class CartModule {}
