const expressPlayground =
  require("graphql-playground-middleware-express").default;
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource as dataSource } from "./AppDataSource";
import { COOKIE_NAME, __prod__ } from "./constants";
import { CartItemResolver } from "./resolvers/cartItem";
import { HelloResolver } from "./resolvers/hello";
import { OrderDetailsResolver } from "./resolvers/orderDetails";
import { OrderItemResolver } from "./resolvers/orderItem";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";
import { UserPermissionResolver } from "./resolvers/userPermission";
import { MyContext } from "./types";

const main = async () => {
  dataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        ProductResolver,
        UserResolver,
        UserPermissionResolver,
        CartItemResolver,
        OrderDetailsResolver,
        OrderItemResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
    })
  );

  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
