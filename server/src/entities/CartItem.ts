import { Cascade } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
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
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Int)
  @PrimaryColumn()
  productId!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  product: Product;

  @Field()
  @Column()
  quantity!: number;

  @Field()
  totalPrice!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
