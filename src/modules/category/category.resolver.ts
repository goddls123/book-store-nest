import { Resolver, Query } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query((type) => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }
}
