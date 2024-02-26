import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Delivery {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field({ nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 30 })
  @Field({ nullable: true })
  receiver: string;

  @Column({ type: 'varchar', length: 20 })
  @Field({ nullable: true })
  contract: string;
}
