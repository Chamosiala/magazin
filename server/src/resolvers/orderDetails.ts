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
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CartItem } from "../entities/CartItem";
import { OrderDetails, orderStates } from "../entities/OrderDetails";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { FieldError } from "./user";
import { sendEmail } from "../utils/sendEmail";
import { orderItemToHtml } from "../utils/orderItemToHtml";
import { UserPermission } from "../entities/UserPermission";
import { isEmployee } from "../middlewares/isEmployee";
import { AppDataSource as dataSource } from "../AppDataSource";
import { PaymentDetails } from "../entities/PaymentDetails";

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

  @FieldResolver(() => String)
  dataFrumoasa(@Root() root: OrderDetails) {
    return root.createdAt
      .toLocaleString("pt-PT", {
        dateStyle: "short",
        timeStyle: "short",
      })
      .replace(".", "/");
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

    let orderDetails: OrderDetails;
    try {
      orderDetails = await OrderDetails.create({
        user,
        userId: req.session.userId,
        judet: input.judet,
        localitate: input.localitate,
        address: input.address,
        total: input.total,
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

  @Query(() => [OrderDetails], { nullable: true })
  ordersByUser(@Ctx() { req }: MyContext): Promise<OrderDetails[] | null> {
    return OrderDetails.findBy({ userId: req.session.userId });
  }

  @Query(() => OrderDetails, { nullable: true })
  async orderById(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<OrderDetails | null> {
    let order = await OrderDetails.findOneBy({ id });

    if (!order) {
      throw new Error("order does not exist");
    } else if (order.userId !== req.session.userId) {
      let userPermission = await UserPermission.findOneBy({
        userId: req.session.userId,
      });
      if (userPermission) {
        return order;
      }
      throw new Error("order belongs to someone else");
    }
    return OrderDetails.findOneBy({ id, userId: req.session.userId });
  }

  @Query(() => [OrderDetails])
  @UseMiddleware(isEmployee)
  async orders(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<OrderDetails[]> {
    const realLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(OrderDetails)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Mutation(() => OrderDetailsResponse)
  @UseMiddleware(isEmployee)
  async updateOrderStatus(
    @Arg("orderId", () => Int) orderId: number,
    @Arg("cancelOrder", () => Boolean, { nullable: true })
    cancelOrder: boolean | null
  ): Promise<OrderDetailsResponse> {
    let order = await OrderDetails.findOneBy({ id: orderId });

    if (!order) {
      return {
        errors: [
          {
            field: "orderDetails",
            message: "Order does not exist",
          },
        ],
      };
    }

    if (cancelOrder && order.status !== orderStates[orderStates.length - 2]) {
      order.status = orderStates[orderStates.length - 1];
      await dataSource
        .createQueryBuilder()
        .update(OrderDetails)
        .set({
          status: order.status,
        })
        .where("id = :orderId", {
          orderId,
        })
        .execute();
    }

    if (orderStates.slice(0, -2).includes(order.status)) {
      const index = orderStates.findIndex((state) => state === order!.status);
      console.log("--------", orderStates[orderStates.length - 1], "--------");
      order.status = orderStates[index + 1];

      await dataSource
        .createQueryBuilder()
        .update(OrderDetails)
        .set({
          status: order.status,
        })
        .where("id = :orderId", {
          orderId,
        })
        .execute();
    }

    return { orderDetails: order };
  }

  @Mutation(() => OrderDetailsResponse)
  @UseMiddleware(isEmployee)
  async setOrderStatus(
    @Arg("orderId", () => Int) orderId: number,
    @Arg("orderStatus", () => String)
    orderStatus: string
  ): Promise<OrderDetailsResponse> {
    let order = await OrderDetails.findOneBy({ id: orderId });

    if (!order) {
      return {
        errors: [
          {
            field: "orderDetails",
            message: "Order does not exist",
          },
        ],
      };
    }

    order.status = orderStatus;

    await dataSource
      .createQueryBuilder()
      .update(OrderDetails)
      .set({
        status: order.status,
      })
      .where("id = :orderId", {
        orderId,
      })
      .execute();

    return { orderDetails: order };
  }
}
