import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType({ description: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true, type: 'varchar', length: 50 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 50 })
  @Field({ nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  salt: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  refreshToken: string;
}
