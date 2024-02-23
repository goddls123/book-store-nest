import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entity/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field({ nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  @Field({ nullable: true })
  isbn?: string;

  @ManyToOne(() => Category, (d) => d.id)
  category: Category;

  @Column({ type: 'int' })
  @Field({ nullable: true })
  categoryId: number;

  @Column({ type: 'varchar' })
  @Field({ nullable: true })
  img: string;

  @Column({ type: 'varchar', length: 50 })
  @Field({ nullable: true })
  form?: string;

  @Column({ type: 'int' })
  @Field((type) => Int, { nullable: true })
  pages?: number;

  @Column({ type: 'varchar', length: 500 })
  @Field({ nullable: true })
  contents?: string;

  @Column({ type: 'varchar', length: 500 })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 300 })
  @Field({ nullable: true })
  summary?: string;

  @Column({ type: 'varchar', length: 20 })
  @Field({ nullable: true })
  author?: string;

  @Column({ type: 'int' })
  @Field((type) => Int)
  price: number;

  @Column({ nullable: true, type: 'int' })
  @Field((type) => Int, { nullable: true })
  likes?: number;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true })
  pubDate?: Date;
}
