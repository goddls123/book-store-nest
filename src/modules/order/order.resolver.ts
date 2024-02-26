import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Order } from './entity/order.entity';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';
import { Ordered } from './entity/ordered.entity';
import { OrderDto } from './dto/order.args';
import { DeliveryDto } from './dto/delivery.args';

@Resolver(() => Order || Ordered)
export class OrderResolver {
  constructor(private readonly orderSerivce: OrderService) {}

  @UseGuards(JwtGuard)
  @Mutation(() => Boolean)
  async order(
    @Args('delivery') deliveryDto: DeliveryDto,
    @Args('order') orderDto: OrderDto,
    @JwtToken() user,
  ): Promise<boolean> {
    try {
      return await this.orderSerivce.order(deliveryDto, orderDto, user.id);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Query(() => [Order])
  async getOrders(@JwtToken() user): Promise<Order[]> {
    return await this.orderSerivce.getOrders(user.id);
  }

  @UseGuards(JwtGuard)
  @Query(() => [Ordered])
  async orderDetail(
    @Args({ name: 'orderId' }) orderId: number,
  ): Promise<Ordered[]> {
    return await this.orderSerivce.getOrderDetail(orderId);
  }
}
