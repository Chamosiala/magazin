import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  judet: string;
  @Field()
  localitate: string;
  @Field()
  address: string;
  @Field()
  telephone: number;
}
