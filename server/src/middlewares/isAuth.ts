import { UserPermission } from "../entities/UserPermission";
import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userPermission = await UserPermission.findOneBy({
    userId: context.req.session.userId,
  });
  console.log(userPermission);
  if (!userPermission || userPermission.permission !== "admin") {
    throw new Error("Permission denied");
  }

  return next();
};
