import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";

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

  @Field()
  @Column()
  amount!: number;

  @Field()
  @Column()
  provider!: string;

  @Field()
  @Column()
  status!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
