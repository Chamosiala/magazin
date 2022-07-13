import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class PaymentDetails extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.paymentDetails)
  user: User;

  @Column()
  cardNumber!: string;

  @Field()
  @Column()
  lastCardNumberDigits!: number;

  @Column()
  cardSecurityCode!: string;

  @Field(() => String)
  @Column()
  cardExpiryDate!: Date;

  @Field()
  isExpired: Boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
