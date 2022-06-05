import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { User } from "./User";

@ObjectType()
@Entity()
export class PaymentDetails extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => OrderDetails)
  @OneToOne(() => OrderDetails)
  @JoinColumn()
  order!: OrderDetails;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.paymentDetails)
  user: User;

  @Column({ nullable: true })
  cardNumber: number;

  @Column({ nullable: true })
  cardSecurityCode: number;

  @Column({ nullable: true })
  cardExpiryDate: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
