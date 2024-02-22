import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field((type) => Number, { nullable: true })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field((type) => String, { nullable: true })
  name: string;
}
