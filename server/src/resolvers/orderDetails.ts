import { OrderItem } from "../entities/OrderItem";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CartItem } from "../entities/CartItem";
import { OrderDetails } from "../entities/OrderDetails";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { FieldError } from "./user";
import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail";
import { orderItemToHtml } from "../utils/orderItemToHtml";

@InputType()
class OrderDetailsInput {
  @Field()
  judet: string;
  @Field()
  localitate: string;
  @Field()
  address: string;
  @Field()
  total: number;
  @Field()
  numarCard: string;
  @Field()
  codSecuritate: string;
}

@ObjectType()
class OrderDetailsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => OrderDetails, { nullable: true })
  orderDetails?: OrderDetails;
}

@Resolver(OrderDetails)
export class OrderDetailsResolver {
  @FieldResolver(() => [OrderItem])
  orderItems(@Root() orderDetails: OrderDetails) {
    return OrderItem.findBy({ orderId: orderDetails.id });
  }

  @Mutation(() => OrderDetailsResponse)
  @UseMiddleware(isAuth)
  async createOrderDetails(
    @Arg("input") input: OrderDetailsInput,
    @Ctx() { req }: MyContext
  ): Promise<OrderDetailsResponse> {
    const user = await User.findOneBy({ id: req.session.userId });
    const cartItems = await CartItem.findBy({ userId: req.session.userId });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User does not exist",
          },
        ],
      };
    }

    const hashedCardNumber = await argon2.hash(input.numarCard);
    const hashedCardSecurityNumber = await argon2.hash(input.codSecuritate);
    let orderDetails: OrderDetails;
    try {
      orderDetails = await OrderDetails.create({
        judet: input.judet,
        localitate: input.localitate,
        address: input.address,
        user,
        userId: req.session.userId,
        total: input.total,
        numarCard: hashedCardNumber,
        codSecuritate: hashedCardSecurityNumber,
      }).save();
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "unknown",
            message: err.message,
          },
        ],
      };
    }

    const orderDetailsId = orderDetails.id;

    try {
      cartItems.forEach(async (cartItem) => {
        await OrderItem.create({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          orderId: orderDetailsId,
          order: orderDetails,
        }).save();
      });
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "orderItem",
            message: err.message,
          },
        ],
      };
    }

    return { orderDetails };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendOrderDetails(
    @Arg("orderDetailsId", () => Int) orderDetailsId: number,
    @Ctx() { req }: MyContext
  ) {
    const orderDetails = await OrderDetails.findOneBy({ id: orderDetailsId });
    const orderItems = await OrderItem.findBy({ orderId: orderDetailsId });
    const user = await User.findOneBy({ id: req.session.userId });
    if (!user || !orderDetails) {
      return false;
    }

    let orderItemsInHtml = "";

    for (const orderItem of orderItems) {
      orderItemsInHtml = orderItemsInHtml.concat(
        await orderItemToHtml(orderItem)
      );
    }

    await sendEmail(
      user.email,
      `
      <div>Comanda ta pentru urmatoarele produse a fost plasata cu succes.</div>
      <h3 style="color:#555;font-size:15px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Produsele comandate</h3>
      <table width="100%" cellpadding="5" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555;">
        <tr style="background-color:#ccc">
          <th align="left" style="color:#555;">Produs</th>
          <th align="right" style="color:#555;">Preț</th>
          <th align="center" style="color:#555;">Cantitate</th>
          <th align="right" style="color:#555;">Total</th>
        </tr>
        ${orderItemsInHtml}
        <tr style="background-color: #ccc">
          <td style="color:#555;"><strong>TOTAL</strong></td>
          <td style="color:#555;">&nbsp;</td>
          <td style="color:#555;">&nbsp;</td>
          <td style="color:#555;" align="right" nowrap><strong>${orderDetails.total} RON</strong></td>
        </tr>
        </table>`
    );

    return true;
  }
}
