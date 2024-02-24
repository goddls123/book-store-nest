import { Resolver } from '@nestjs/graphql';
import { Cart } from './entity/cart.entity';

@Resolver(() => Cart)
export class CartResolver {}
