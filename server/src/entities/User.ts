import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { PaymentDetails } from "./PaymentDetails";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  judet!: string;

  @Field()
  @Column()
  localitate!: string;

  @Field()
  @Column()
  address!: string;

  @Field(() => Float)
  @Column({ unique: true })
  telephone!: number;

  @Field(() => [PaymentDetails], { nullable: true })
  @OneToMany(() => PaymentDetails, (paymentDetails) => paymentDetails.user)
  paymentDetails: PaymentDetails[];

  @Field(() => Int, { nullable: true })
  defaultPayment: number | null;

  @Field(() => [OrderDetails], { nullable: true })
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.user)
  orders: OrderDetails[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
