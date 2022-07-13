import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { Discount } from "./Discount";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  desc: string;

  @Field()
  @Column()
  SKU!: string;

  @Field(() => String, { nullable: true })
  @Column()
  imageLink: string;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column("decimal")
  price!: number;

  @Field(() => Discount, { nullable: true })
  @ManyToOne(() => Discount)
  discount: Discount;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
