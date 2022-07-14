import { User } from "../entities/User";
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
import argon2 from "argon2";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { RegisterInput } from "./RegisterInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { UserPermission } from "../entities/UserPermission";
import { AppDataSource as dataSource } from "../AppDataSource";
import { isEmployee } from "../middlewares/isEmployee";
import { isAuth } from "../middlewares/isAuth";
import { UpdateResult } from "typeorm";
import { validateUserUpdate } from "../utils/validateUserUpdate";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@InputType()
export class EditInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  judet: string;
  @Field()
  localitate: string;
  @Field()
  address: string;
  @Field()
  telephone: number;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String, { nullable: true })
  async permission(@Root() user: User) {
    const userPermission = await UserPermission.findOneBy({ userId: user.id });

    if (!userPermission) {
      return null;
    } else {
      return userPermission.permission;
    }
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }

    const user = await User.findOneBy({ id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    const password = await argon2.hash(newPassword);
    await User.update({ id: parseInt(userId) }, { password });

    await redis.del(key);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async changeKnownPassword(
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 2",
          },
        ],
      };
    }

    const user = await User.findOneBy({ id: req.session.userId });
    if (!user) {
      return {
        errors: [
          {
            field: "unknown",
            message: "user no longer exists",
          },
        ],
      };
    }

    const valid = await argon2.verify(user!.password, oldPassword);
    if (!valid) {
      return {
        errors: [
          {
            field: "oldPassword",
            message: "Incorrect password",
          },
        ],
      };
    }

    if (newPassword === oldPassword) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "New password must be different",
          },
        ],
      };
    }

    const password = await argon2.hash(newPassword);
    await User.update({ id: req.session.userId }, { password });

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOneBy({ email });
    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3 // 3 days
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`
    );

    return true;
  }
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOneBy({ id: req.session.userId });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      user = await User.create({
        email: options.email,
        username: options.username,
        password: hashedPassword,
        firstName: options.firstName,
        lastName: options.lastName,
        judet: options.judet,
        localitate: options.localitate,
        address: options.address,
        telephone: options.telephone,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        let field = /\((\w+)/g.exec(err.detail)![1];
        return {
          errors: [
            {
              field,
              message:
                field.charAt(0).toUpperCase() +
                field.slice(1) +
                " already exists",
            },
          ],
        };
      }
    }

    req.session.userId = user?.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (usernameOrEmail === "") {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Introdu un nume sau email",
          },
        ],
      };
    }
    const user = await User.findOneBy(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Acel username sau email nu exista",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (password === "") {
      return {
        errors: [
          {
            field: "password",
            message: "Introdu o parola",
          },
        ],
      };
    }
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Parola gresita",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Query(() => [User])
  @UseMiddleware(isEmployee)
  async users(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<User[]> {
    const realLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(User)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isEmployee)
  userById(@Arg("id", () => Int) id: number): Promise<User | null> {
    return User.findOneBy({ id });
  }

  @Mutation(() => Boolean)
  async setDefaultPayment(
    @Arg("paymentDetailsId", () => Int) paymentDetailsId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const user = await User.findOneBy({ id: req.session.userId });
    if (!user) {
      return false;
    }

    if (paymentDetailsId === 0) {
      user.defaultPayment = null;
    } else {
      user.defaultPayment = paymentDetailsId;
    }

    return true;
  }

  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: EditInput
  ): Promise<UserResponse> {
    const errors = validateUserUpdate(input);
    if (errors) {
      return { errors };
    }

    let result: UpdateResult;
    try {
      result = await dataSource
        .getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          judet: input.judet,
          localitate: input.localitate,
          address: input.address,
          telephone: input.telephone,
        })
        .where("id = :id", {
          id,
        })
        .returning("*")
        .execute();
    } catch (err) {
      if (err.code === "23505") {
        let field = /\((\w+)/g.exec(err.detail)![1];
        return {
          errors: [
            {
              field,
              message:
                field.charAt(0).toUpperCase() +
                field.slice(1) +
                " already exists",
            },
          ],
        };
      }
    }

    return { user: result!.raw[0] };
  }
}
