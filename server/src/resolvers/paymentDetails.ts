import argon2 from "argon2";
import { validatePayment } from "../utils/validatePayment";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { PaymentDetails } from "../entities/PaymentDetails";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { FieldError } from "./user";
import { User } from "../entities/User";
import { DatabaseSchema } from "@mikro-orm/postgresql";

@InputType()
export class PaymentDetailsInput {
  @Field()
  cardNumber!: number;
  @Field()
  cardSecurityCode!: number;
  @Field()
  cardExpiryDate!: Date;
}

@ObjectType()
class PaymentDetailsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => PaymentDetails, { nullable: true })
  paymentDetails?: PaymentDetails;
}

@Resolver(PaymentDetails)
export class PaymentDetailsResolver {
  @FieldResolver(() => User)
  user(@Root() paymentDetails: PaymentDetails) {
    return User.findOneBy({ id: paymentDetails.userId });
  }

  @FieldResolver(() => Boolean)
  isExpired(@Root() paymentDetails: PaymentDetails) {
    let currentDate = new Date();

    return paymentDetails.cardExpiryDate < currentDate;
  }

  @FieldResolver(() => String)
  dataFrumoasa(@Root() root: PaymentDetails) {
    return root.cardExpiryDate
      .toLocaleString("pt-PT", {
        dateStyle: "short",
        timeStyle: "short",
      })
      .replace(".", "/")
      .slice(3, 8);
  }

  @Mutation(() => PaymentDetailsResponse)
  @UseMiddleware(isAuth)
  async createPaymentDetails(
    @Arg("input") input: PaymentDetailsInput,
    @Ctx() { req }: MyContext
  ): Promise<PaymentDetailsResponse> {
    const errors = validatePayment(input);
    if (errors) {
      return { errors };
    }

    const hashedCardNumber = await argon2.hash(input.cardNumber.toString());
    const hashedCardSecurityCode = await argon2.hash(
      input.cardSecurityCode.toString()
    );
    let paymentDetails;

    paymentDetails = await PaymentDetails.create({
      userId: req.session.userId,
      cardNumber: hashedCardNumber,
      lastCardNumberDigits: input.cardNumber % 10000,
      cardSecurityCode: hashedCardSecurityCode,
      cardExpiryDate: input.cardExpiryDate,
    }).save();

    return { paymentDetails };
  }

  @Query(() => [PaymentDetails], { nullable: true })
  @UseMiddleware(isAuth)
  async paymentDetailsByUser(
    @Ctx() { req }: MyContext
  ): Promise<PaymentDetails[] | null> {
    let paymentDetails = await PaymentDetails.findBy({
      userId: req.session.userId,
    });
    if (paymentDetails.length === 0) {
      return null;
    }

    return paymentDetails;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePaymentDetails(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const paymentDetails = await PaymentDetails.findOneBy({ id });
    if (!paymentDetails) {
      return false;
    }

    if (paymentDetails.userId !== req.session.userId) {
      return false;
    }

    await PaymentDetails.delete(id);
    return true;
  }
}
