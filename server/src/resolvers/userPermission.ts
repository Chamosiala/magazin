import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { UserPermission } from "../entities/UserPermission";
import { FieldError } from "./user";
import { isAdmin } from "../middlewares/isAdmin";

@ObjectType()
class UserPermissionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserPermission, { nullable: true })
  userPermission?: UserPermission;
}

@Resolver()
export class UserPermissionResolver {
  @Mutation(() => UserPermissionResponse)
  @UseMiddleware(isAdmin)
  async createUserPermission(
    @Arg("userId", () => Int) userId: number,
    @Arg("permission", () => String) permission: string
  ): Promise<UserPermissionResponse> {
    const user = await User.findOneBy({ id: userId });

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

    let userPermission;
    try {
      userPermission = await UserPermission.create({
        userId,
        user,
        permission,
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

    return { userPermission };
  }
}
