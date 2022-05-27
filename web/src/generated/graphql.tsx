import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CartItem = {
  __typename?: 'CartItem';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  product: Product;
  productId: Scalars['Int'];
  quantity: Scalars['Float'];
  totalPrice: Scalars['Float'];
  updatedAt: Scalars['String'];
  userId: Scalars['Int'];
};

export type CartItemInput = {
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
  userId: Scalars['Float'];
};

export type CartItemResponse = {
  __typename?: 'CartItemResponse';
  cartItem?: Maybe<CartItem>;
  errors?: Maybe<Array<FieldError>>;
};

export type Discount = {
  __typename?: 'Discount';
  createdAt: Scalars['String'];
  desc: Scalars['String'];
  discountPercent: Scalars['Float'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createCartItem: CartItemResponse;
  createOrderDetails: OrderDetailsResponse;
  createProduct: ProductResponse;
  createUserPermission: UserPermissionResponse;
  deleteCartItem: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  emptyCart: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendOrderDetails: Scalars['Boolean'];
  updateProduct?: Maybe<Product>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCartItemArgs = {
  input: CartItemInput;
};


export type MutationCreateOrderDetailsArgs = {
  input: OrderDetailsInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateUserPermissionArgs = {
  permission: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationSendOrderDetailsArgs = {
  orderDetailsId: Scalars['Int'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  address: Scalars['String'];
  codSecuritate: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  judet: Scalars['String'];
  localitate: Scalars['String'];
  numarCard: Scalars['String'];
  orderItems?: Maybe<Array<OrderItem>>;
  total: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type OrderDetailsInput = {
  address: Scalars['String'];
  codSecuritate: Scalars['String'];
  judet: Scalars['String'];
  localitate: Scalars['String'];
  numarCard: Scalars['String'];
  total: Scalars['Float'];
};

export type OrderDetailsResponse = {
  __typename?: 'OrderDetailsResponse';
  errors?: Maybe<Array<FieldError>>;
  orderDetails?: Maybe<OrderDetails>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  order?: Maybe<OrderDetails>;
  orderId: Scalars['Float'];
  product: Product;
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  SKU: Scalars['String'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  desc: Scalars['String'];
  descSnippet: Scalars['String'];
  discount?: Maybe<Discount>;
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ProductInput = {
  SKU: Scalars['String'];
  category: Scalars['String'];
  desc: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  errors?: Maybe<Array<FieldError>>;
  product?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  cartItems: Array<CartItem>;
  cartItemsByUser: Array<CartItem>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  product?: Maybe<Product>;
  productByName?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryCartItemsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCartItemsByUserArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryProductByNameArgs = {
  name: Scalars['String'];
};


export type QueryProductsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  judet: Scalars['String'];
  lastName: Scalars['String'];
  localitate: Scalars['String'];
  password: Scalars['String'];
  telephone: Scalars['Float'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  isAdmin: Scalars['Boolean'];
  judet: Scalars['String'];
  lastName: Scalars['String'];
  localitate: Scalars['String'];
  orders?: Maybe<Array<OrderDetails>>;
  telephone: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  permission: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type UserPermissionResponse = {
  __typename?: 'UserPermissionResponse';
  errors?: Maybe<Array<FieldError>>;
  userPermission?: Maybe<UserPermission>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean } | null } };

export type CreateCartItemMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', createCartItem: { __typename?: 'CartItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, cartItem?: { __typename?: 'CartItem', id: number, productId: number, userId: number, quantity: number, createdAt: string, updatedAt: string } | null } };

export type CreateOrderDetailsMutationVariables = Exact<{
  input: OrderDetailsInput;
}>;


export type CreateOrderDetailsMutation = { __typename?: 'Mutation', createOrderDetails: { __typename?: 'OrderDetailsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, orderDetails?: { __typename?: 'OrderDetails', id: number, userId: number, judet: string, localitate: string, address: string, total: number } | null } };

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, product?: { __typename?: 'Product', name: string, desc: string, SKU: string, category: string } | null } };

export type DeleteCartItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: boolean };

export type EmptyCartMutationVariables = Exact<{ [key: string]: never; }>;


export type EmptyCartMutation = { __typename?: 'Mutation', emptyCart: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean } | null } };

export type SendOrderDetailsMutationVariables = Exact<{
  orderDetailsId: Scalars['Int'];
}>;


export type SendOrderDetailsMutation = { __typename?: 'Mutation', sendOrderDetails: boolean };

export type CartItemsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CartItemsQuery = { __typename?: 'Query', cartItems: Array<{ __typename?: 'CartItem', id: number, productId: number, userId: number, quantity: number, createdAt: string, updatedAt: string, totalPrice: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> };

export type CartItemsByUserQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CartItemsByUserQuery = { __typename?: 'Query', cartItemsByUser: Array<{ __typename?: 'CartItem', id: number, productId: number, userId: number, quantity: number, createdAt: string, updatedAt: string, totalPrice: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, isAdmin: boolean } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null };

export type ProductByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ProductByNameQuery = { __typename?: 'Query', productByName?: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null };

export type ProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null }> };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  firstName
  lastName
  judet
  localitate
  address
  telephone
  isAdmin
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCartItemDocument = gql`
    mutation CreateCartItem($input: CartItemInput!) {
  createCartItem(input: $input) {
    errors {
      ...RegularError
    }
    cartItem {
      id
      productId
      userId
      quantity
      createdAt
      updatedAt
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useCreateCartItemMutation() {
  return Urql.useMutation<CreateCartItemMutation, CreateCartItemMutationVariables>(CreateCartItemDocument);
};
export const CreateOrderDetailsDocument = gql`
    mutation CreateOrderDetails($input: OrderDetailsInput!) {
  createOrderDetails(input: $input) {
    errors {
      field
      message
    }
    orderDetails {
      id
      userId
      judet
      localitate
      address
      total
    }
  }
}
    `;

export function useCreateOrderDetailsMutation() {
  return Urql.useMutation<CreateOrderDetailsMutation, CreateOrderDetailsMutationVariables>(CreateOrderDetailsDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    errors {
      ...RegularError
    }
    product {
      name
      desc
      SKU
      category
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($id: Int!) {
  deleteCartItem(id: $id)
}
    `;

export function useDeleteCartItemMutation() {
  return Urql.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument);
};
export const EmptyCartDocument = gql`
    mutation EmptyCart {
  emptyCart
}
    `;

export function useEmptyCartMutation() {
  return Urql.useMutation<EmptyCartMutation, EmptyCartMutationVariables>(EmptyCartDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendOrderDetailsDocument = gql`
    mutation SendOrderDetails($orderDetailsId: Int!) {
  sendOrderDetails(orderDetailsId: $orderDetailsId)
}
    `;

export function useSendOrderDetailsMutation() {
  return Urql.useMutation<SendOrderDetailsMutation, SendOrderDetailsMutationVariables>(SendOrderDetailsDocument);
};
export const CartItemsDocument = gql`
    query CartItems($limit: Int!, $cursor: String) {
  cartItems(limit: $limit, cursor: $cursor) {
    id
    productId
    userId
    quantity
    createdAt
    updatedAt
    product {
      id
      createdAt
      updatedAt
      name
      desc
      descSnippet
      price
      SKU
      category
      discount {
        id
        name
        desc
        discountPercent
        createdAt
        updatedAt
      }
    }
    totalPrice
  }
}
    `;

export function useCartItemsQuery(options: Omit<Urql.UseQueryArgs<CartItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<CartItemsQuery>({ query: CartItemsDocument, ...options });
};
export const CartItemsByUserDocument = gql`
    query CartItemsByUser($limit: Int!, $cursor: String) {
  cartItemsByUser(limit: $limit, cursor: $cursor) {
    id
    productId
    userId
    quantity
    createdAt
    updatedAt
    product {
      id
      createdAt
      updatedAt
      name
      desc
      descSnippet
      price
      SKU
      category
      discount {
        id
        name
        desc
        discountPercent
        createdAt
        updatedAt
      }
    }
    totalPrice
  }
}
    `;

export function useCartItemsByUserQuery(options: Omit<Urql.UseQueryArgs<CartItemsByUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CartItemsByUserQuery>({ query: CartItemsByUserDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    id
    createdAt
    updatedAt
    name
    desc
    descSnippet
    price
    SKU
    category
    discount {
      id
      name
      desc
      discountPercent
      createdAt
      updatedAt
    }
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductByNameDocument = gql`
    query ProductByName($name: String!) {
  productByName(name: $name) {
    id
    createdAt
    updatedAt
    name
    desc
    descSnippet
    price
    SKU
    category
    discount {
      id
      name
      desc
      discountPercent
      createdAt
      updatedAt
    }
  }
}
    `;

export function useProductByNameQuery(options: Omit<Urql.UseQueryArgs<ProductByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductByNameQuery>({ query: ProductByNameDocument, ...options });
};
export const ProductsDocument = gql`
    query Products($limit: Int!, $cursor: String) {
  products(limit: $limit, cursor: $cursor) {
    id
    createdAt
    updatedAt
    name
    desc
    descSnippet
    price
    SKU
    category
    discount {
      id
      name
      desc
      discountPercent
      createdAt
      updatedAt
    }
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};