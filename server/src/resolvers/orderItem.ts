import { OrderItem } from "../entities/OrderItem";
import { Product } from "../entities/Product";
import { Resolver, FieldResolver, Root } from "type-graphql";

@Resolver(OrderItem)
export class OrderItemResolver {
  @FieldResolver(() => Product)
  product(@Root() orderItem: OrderItem) {
    return Product.findOneBy({ id: orderItem.productId });
  }
}
