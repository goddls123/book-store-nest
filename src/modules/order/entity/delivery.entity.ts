import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Delivery {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field()
  address: string;

  @Column({ type: 'varchar', length: 30 })
  @Field()
  receiver: string;

  @Column({ type: 'varchar', length: 20 })
  @Field()
  contract: string;
}
