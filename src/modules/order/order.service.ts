import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entity/delivery.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { Ordered } from './entity/ordered.entity';
import { OrderDto } from './dto/order.args';
import { DeliveryDto } from './dto/delivery.args';
import { Cart } from '../cart/entity/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Ordered)
    private readonly orderedRepository: Repository<Ordered>,
    private readonly dataSource: DataSource,
  ) {}

  async order(
    deliveryDto: DeliveryDto,
    orderDto: OrderDto,
    userId: number,
  ): Promise<boolean> {
    const delivery: Delivery = new Delivery();
    delivery.setDelivery(deliveryDto);
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.startTransaction();
    try {
      const savedDelivery: Delivery = await queryRunner.manager.save(delivery);

      const orders: Order = new Order();
      orders.setOrder(savedDelivery.id, orderDto, userId);
      const savedOrders: Order = await queryRunner.manager.save(orders);

      const items: Ordered[] = orderDto.items.map(
        (i) =>
          new Ordered(Number(i.bookId), Number(i.quantity), savedOrders.id),
      );

      await queryRunner.manager.save(items);

      const cartIds = orderDto.items.map((i) => i.cartId);

      await queryRunner.manager.delete(Cart, { id: In(cartIds) });

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new Error(e);
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async getOrders(userId: number): Promise<Order[]> {
    const oders: Order[] = await this.orderRepository.find({
      relations: { delivery: true },
      where: { userId },
    });
    return oders;
  }

  async getOrderDetail(orderId: number): Promise<Ordered[]> {
    return await this.orderedRepository.find({
      relations: { book: true },
      where: { orderId },
    });
  }
}
