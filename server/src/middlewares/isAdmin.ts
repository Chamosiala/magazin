import { UserPermission } from "../entities/UserPermission";
import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }

  const userPermission = await UserPermission.findOneBy({
    userId: context.req.session.userId,
  });
  if (!userPermission || userPermission.permission !== "admin") {
    throw new Error("Permission denied");
  }

  return next();
};
