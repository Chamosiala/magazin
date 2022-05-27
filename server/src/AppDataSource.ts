import { DataSource } from "typeorm";
import "dotenv-safe/config";
import { CartItem } from "./entities/CartItem";
import { Discount } from "./entities/Discount";
import { OrderDetails } from "./entities/OrderDetails";
import { OrderItem } from "./entities/OrderItem";
import { PaymentDetails } from "./entities/PaymentDetails";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import { UserPermission } from "./entities/UserPermission";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [
    Product,
    User,
    Discount,
    CartItem,
    OrderDetails,
    OrderItem,
    PaymentDetails,
    UserPermission,
  ],
});
