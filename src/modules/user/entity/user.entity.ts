import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@ObjectType({ description: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field()
  salt: string;
}
