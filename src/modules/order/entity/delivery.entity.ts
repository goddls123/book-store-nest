import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryDto } from '../dto/delivery.args';

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
  contact: string;

  setDelivery(delivery: DeliveryDto) {
    this.address = delivery.address;
    this.contact = delivery.contact;
    this.receiver = delivery.receiver;
  }
}
