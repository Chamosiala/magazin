import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  orderId: number;

  @Field(() => OrderDetails, { nullable: true })
  @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderItems)
  order: OrderDetails;

  @Field()
  @Column()
  productId!: number;

  @Field()
  @Column()
  quantity!: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  product: Product;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
