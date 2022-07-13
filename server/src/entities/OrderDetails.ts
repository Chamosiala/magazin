import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@ObjectType()
@Entity()
export class OrderDetails extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Field()
  @Column()
  judet!: string;

  @Field()
  @Column()
  localitate!: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column("decimal")
  total!: number;

  @Field()
  @Column({ default: "In asteptare" })
  status!: string;

  @Field(() => [OrderItem], { nullable: true })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}

export const orderStates = [
  "In asteptare",
  "In lucru",
  "In curs de livrare",
  "Finalizata",
  "Anulata",
];
