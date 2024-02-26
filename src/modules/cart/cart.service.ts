import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { In, Repository } from 'typeorm';
import { CartDto } from './dto/cart.args';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async getCartItems(selected: number[], userId: number): Promise<Cart[]> {
    if (selected?.length) {
      return await this.cartRepository.find({
        relations: { book: true, user: true },
        where: { userId, book: { id: In(selected) } },
      });
    } else {
      return await this.cartRepository.find({
        relations: { book: true, user: true },
        where: { userId },
      });
    }
  }

  async addToCart(cartDto: CartDto, userId: number): Promise<Cart> {
    const cart = new Cart();
    cart.bookId = cartDto.bookId;
    cart.quantity = cartDto.quantity;
    cart.userId = userId;

    await this.cartRepository.save(cart);

    return cart;
  }

  async deleteToCart(id: number): Promise<boolean> {
    await this.cartRepository.delete({ id });
    return true;
  }
}
