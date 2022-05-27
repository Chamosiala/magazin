import { Product } from "../entities/Product";
import {
  Arg,
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
import { isAdmin } from "../middlewares/isAdmin";
import { FieldError } from "./user";
import { duplicateFieldCheck } from "../utils/duplicateFieldCheck";
import { AppDataSource as dataSource } from "../AppDataSource";

@InputType()
class ProductInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  SKU!: string;
  @Field()
  category!: string;
  @Field()
  price!: number;
}

@ObjectType()
class ProductResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}

@Resolver(Product)
export class ProductResolver {
  @FieldResolver(() => String)
  descSnippet(@Root() root: Product) {
    return root.desc.slice(0, 50);
  }

  @Query(() => [Product])
  async products(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Product[]> {
    const realLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(Product)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id", () => Int) id: number): Promise<Product | null> {
    return Product.findOneBy({ id });
  }

  @Query(() => Product, { nullable: true })
  productByName(
    @Arg("name", () => String) name: string
  ): Promise<Product | null> {
    return Product.findOneBy({ name });
  }

  @Mutation(() => ProductResponse)
  @UseMiddleware(isAdmin)
  async createProduct(
    @Arg("input") input: ProductInput
  ): Promise<ProductResponse> {
    let product;
    try {
      product = await Product.create({ ...input }).save();
    } catch (err) {
      const alreadyExists = duplicateFieldCheck(err);
      if (alreadyExists) {
        return alreadyExists;
      }

      return {
        errors: [
          {
            field: "unkown",
            message: err.message,
          },
        ],
      };
    }

    return { product };
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string
  ): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (!product) {
      return null;
    }
    if (typeof name !== "undefined") {
      product.name = name;
      await Product.update({ id }, { name });
    }
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    await Product.delete(id);
    return true;
  }
}
