import { MyContext } from "../types";
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
import { AppDataSource as dataSource } from "../AppDataSource";
import { CartItem } from "../entities/CartItem";
import { Product } from "../entities/Product";
import { isAuth } from "../middlewares/isAuth";
import { FieldError } from "./user";

@InputType()
class CartItemInput {
  @Field()
  productId: number;
  @Field()
  userId: number;
  @Field()
  quantity: number;
}

@ObjectType()
class CartItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CartItem, { nullable: true })
  cartItem?: CartItem;
}

@Resolver(CartItem)
export class CartItemResolver {
  @FieldResolver(() => Product)
  product(@Root() cartItem: CartItem) {
    return Product.findOneBy({ id: cartItem.productId });
  }

  @FieldResolver(() => Int)
  async totalPrice(@Root() cartItem: CartItem) {
    const product = await Product.findOneBy({ id: cartItem.productId });
    return product!.price * cartItem.quantity;
  }

  @Mutation(() => CartItemResponse)
  @UseMiddleware(isAuth)
  async createCartItem(
    @Arg("input") input: CartItemInput
  ): Promise<CartItemResponse> {
    const product = await Product.findOneBy({ id: input.productId });

    if (!product) {
      return {
        errors: [
          {
            field: "product",
            message: "Product does not exist",
          },
        ],
      };
    }

    let cartItem;
    cartItem = await CartItem.findOne({
      where: {
        userId: input.userId,
        productId: input.productId,
      },
    });
    if (cartItem) {
      cartItem.quantity += 1;
      await dataSource
        .createQueryBuilder()
        .update(CartItem)
        .set({
          quantity: () => "quantity + 1",
        })
        .where("userId = :userId AND productId = :productId", {
          userId: input.userId,
          productId: input.productId,
        })
        .execute();
    } else {
      try {
        cartItem = await CartItem.create({
          productId: input.productId,
          userId: input.userId,
          // product,
          quantity: input.quantity,
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
    }

    return { cartItem };
  }

  @Query(() => [CartItem])
  async cartItems(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<CartItem[]> {
    const realLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(CartItem)
      .createQueryBuilder("c")
      .orderBy('"createdAt"', "ASC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" > :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Query(() => [CartItem])
  async cartItemsByUser(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<CartItem[]> {
    let userId = req.session.userId;
    const realLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(CartItem)
      .createQueryBuilder("c")
      .orderBy('"createdAt"', "ASC")
      .take(realLimit)
      .where('"userId" = :userId', {
        userId,
      });
    if (cursor) {
      qb.where('"createdAt" > :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Mutation(() => Boolean)
  async deleteCartItem(@Arg("id", () => Int) id: number): Promise<boolean> {
    const cartItem = await CartItem.findOneBy({ id });

    if (cartItem && cartItem.quantity > 1) {
      await dataSource
        .createQueryBuilder()
        .update(CartItem)
        .set({
          quantity: () => "quantity - 1",
        })
        .where("id = :id", {
          id,
        })
        .execute();
    } else {
      await CartItem.delete({ id });
    }
    return true;
  }

  @Mutation(() => Boolean)
  async emptyCart(@Ctx() { req }: MyContext): Promise<boolean> {
    await CartItem.delete({ userId: req.session.userId });

    return true;
  }
}
