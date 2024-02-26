import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entity/delivery.entity';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { Ordered } from './entity/ordered.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Ordered)
    private readonly orderedRepository: Repository<Ordered>,
    private readonly cartService: CartService,
  ) {}

  async order() {}

  async getOrders(userId: number): Promise<Order[]> {
    const oders: Order[] = await this.orderRepository.find({
      relations: { delivery: true },
      where: { userId },
    });
    return oders;
  }

  async getOrderDetail(orderId: number): Promise<Ordered> {
    return await this.orderedRepository.findOne({
      relations: { book: true },
      where: { orderId },
    });
  }
}
