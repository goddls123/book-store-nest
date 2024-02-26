import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.args';
import { JwtToken } from 'src/common/decorator/JwtToken.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Query(() => [Cart])
  async carts(
    @Args('selected', { type: () => [Int], nullable: true })
    selected: number[],
    @JwtToken() user,
  ) {
    try {
      return await this.cartService.getCartItems(selected, user.id);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Cart)
  async addCart(@Args() cartDto: CartDto, @JwtToken() user): Promise<Cart> {
    try {
      return await this.cartService.addToCart(cartDto, user.id);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Boolean)
  async deleteCart(@Args({ name: 'id' }) cartId: number): Promise<boolean> {
    try {
      return await this.cartService.deleteToCart(cartId);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
