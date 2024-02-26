import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entity/delivery.entity';
import { Order } from './entity/order.entity';
import { Ordered } from './entity/ordered.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Order, Ordered])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
