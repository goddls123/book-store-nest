import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartService: Repository<Cart>,
  ) {}

  async getCartItems() {}

  async addToCart() {}

  async deleteToCart(id: number): Promise<boolean> {
    this.cartService.delete({ id });
    return true;
  }
}
