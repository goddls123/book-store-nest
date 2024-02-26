import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Order } from './entity/order.entity';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';
import { Ordered } from './entity/ordered.entity';

@Resolver(() => Order || Ordered)
export class OrderResolver {
  constructor(private readonly orderSerivce: OrderService) {}

  @UseGuards(JwtGuard)
  @Query(() => [Order])
  async getOrders(@JwtToken() user) {
    return this.orderSerivce.getOrders(user.id);
  }

  @UseGuards(JwtGuard)
  @Query(() => Ordered)
  async orderDetail(@Args({ name: 'orderId' }) orderId: number) {
    return this.orderSerivce.getOrderDetail(orderId);
  }
}
