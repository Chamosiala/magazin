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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
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
  user: User;
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

export type EditInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  judet: Scalars['String'];
  lastName: Scalars['String'];
  localitate: Scalars['String'];
  telephone: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeKnownPassword: UserResponse;
  changePassword: UserResponse;
  createCartItem: CartItemResponse;
  createOrderDetails: OrderDetailsResponse;
  createPaymentDetails: PaymentDetailsResponse;
  createProduct: ProductResponse;
  createUserPermission: UserPermissionResponse;
  deleteCartItem: Scalars['Boolean'];
  deletePaymentDetails: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteUserPermission: Scalars['Boolean'];
  emptyCart: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendOrderDetails: Scalars['Boolean'];
  setDefaultPayment: Scalars['Boolean'];
  setOrderStatus: OrderDetailsResponse;
  updateOrderStatus: OrderDetailsResponse;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
};


export type MutationChangeKnownPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
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


export type MutationCreatePaymentDetailsArgs = {
  input: PaymentDetailsInput;
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


export type MutationDeletePaymentDetailsArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserPermissionArgs = {
  userId: Scalars['Int'];
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


export type MutationSetDefaultPaymentArgs = {
  paymentDetailsId: Scalars['Int'];
};


export type MutationSetOrderStatusArgs = {
  orderId: Scalars['Int'];
  orderStatus: Scalars['String'];
};


export type MutationUpdateOrderStatusArgs = {
  cancelOrder?: InputMaybe<Scalars['Boolean']>;
  orderId: Scalars['Int'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int'];
  input: ProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: EditInput;
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  dataFrumoasa: Scalars['String'];
  id: Scalars['Int'];
  judet: Scalars['String'];
  localitate: Scalars['String'];
  orderItems?: Maybe<Array<OrderItem>>;
  status: Scalars['String'];
  total: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type OrderDetailsInput = {
  address: Scalars['String'];
  judet: Scalars['String'];
  localitate: Scalars['String'];
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

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  cardExpiryDate: Scalars['String'];
  createdAt: Scalars['String'];
  dataFrumoasa: Scalars['String'];
  id: Scalars['Int'];
  isExpired: Scalars['Boolean'];
  lastCardNumberDigits: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type PaymentDetailsInput = {
  cardExpiryDate: Scalars['DateTime'];
  cardNumber: Scalars['Float'];
  cardSecurityCode: Scalars['Float'];
};

export type PaymentDetailsResponse = {
  __typename?: 'PaymentDetailsResponse';
  errors?: Maybe<Array<FieldError>>;
  paymentDetails?: Maybe<PaymentDetails>;
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
  imageLink?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ProductInput = {
  SKU: Scalars['String'];
  category: Scalars['String'];
  desc: Scalars['String'];
  imageLink: Scalars['String'];
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
  myPermission?: Maybe<UserPermission>;
  orderById?: Maybe<OrderDetails>;
  orders: Array<OrderDetails>;
  ordersByUser?: Maybe<Array<OrderDetails>>;
  paymentDetailsByUser?: Maybe<Array<PaymentDetails>>;
  product?: Maybe<Product>;
  productByName?: Maybe<Product>;
  products: Array<Product>;
  userById?: Maybe<User>;
  users: Array<User>;
};


export type QueryCartItemsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCartItemsByUserArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['Int'];
};


export type QueryOrdersArgs = {
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


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
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
  defaultPayment?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  judet: Scalars['String'];
  lastName: Scalars['String'];
  localitate: Scalars['String'];
  orders?: Maybe<Array<OrderDetails>>;
  paymentDetails?: Maybe<Array<PaymentDetails>>;
  permission?: Maybe<Scalars['String']>;
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

export type RegularOrderFragment = { __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null };

export type RegularPaymentDetailsFragment = { __typename?: 'PaymentDetails', id: number, userId: number, lastCardNumberDigits: number, cardExpiryDate: string, isExpired: boolean, dataFrumoasa: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } };

export type RegularProductFragment = { __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null };

export type ChangeKnownPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangeKnownPasswordMutation = { __typename?: 'Mutation', changeKnownPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null } };

export type CreateCartItemMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', createCartItem: { __typename?: 'CartItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, cartItem?: { __typename?: 'CartItem', id: number, productId: number, userId: number, quantity: number, createdAt: string, updatedAt: string, totalPrice: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } } | null } };

export type CreateOrderDetailsMutationVariables = Exact<{
  input: OrderDetailsInput;
}>;


export type CreateOrderDetailsMutation = { __typename?: 'Mutation', createOrderDetails: { __typename?: 'OrderDetailsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, orderDetails?: { __typename?: 'OrderDetails', id: number, userId: number, judet: string, localitate: string, address: string, total: number } | null } };

export type CreatePaymentDetailsMutationVariables = Exact<{
  input: PaymentDetailsInput;
}>;


export type CreatePaymentDetailsMutation = { __typename?: 'Mutation', createPaymentDetails: { __typename?: 'PaymentDetailsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, paymentDetails?: { __typename?: 'PaymentDetails', id: number, userId: number, lastCardNumberDigits: number, cardExpiryDate: string, isExpired: boolean, dataFrumoasa: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } } | null } };

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, product?: { __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null } };

export type CreateUserPermissionMutationVariables = Exact<{
  userId: Scalars['Int'];
  permission: Scalars['String'];
}>;


export type CreateUserPermissionMutation = { __typename?: 'Mutation', createUserPermission: { __typename?: 'UserPermissionResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, userPermission?: { __typename?: 'UserPermission', userId: number, permission: string } | null } };

export type DeleteCartItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: boolean };

export type DeletePaymentDetailsMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePaymentDetailsMutation = { __typename?: 'Mutation', deletePaymentDetails: boolean };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type DeleteUserPermissionMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeleteUserPermissionMutation = { __typename?: 'Mutation', deleteUserPermission: boolean };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null } };

export type SendOrderDetailsMutationVariables = Exact<{
  orderDetailsId: Scalars['Int'];
}>;


export type SendOrderDetailsMutation = { __typename?: 'Mutation', sendOrderDetails: boolean };

export type SetDefaultPaymentMutationVariables = Exact<{
  paymentDetailsId: Scalars['Int'];
}>;


export type SetDefaultPaymentMutation = { __typename?: 'Mutation', setDefaultPayment: boolean };

export type SetOrderStatusMutationVariables = Exact<{
  orderId: Scalars['Int'];
  orderStatus: Scalars['String'];
}>;


export type SetOrderStatusMutation = { __typename?: 'Mutation', setOrderStatus: { __typename?: 'OrderDetailsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, orderDetails?: { __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null } | null } };

export type UpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['Int'];
  cancelOrder?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: { __typename?: 'OrderDetailsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, orderDetails?: { __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null } | null } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'ProductResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, product?: { __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  input: EditInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null } | null };

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


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null };

export type MyPermissionQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPermissionQuery = { __typename?: 'Query', myPermission?: { __typename?: 'UserPermission', permission: string } | null };

export type OrderByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null } | null };

export type OrdersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null }> };

export type OrdersByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersByUserQuery = { __typename?: 'Query', ordersByUser?: Array<{ __typename?: 'OrderDetails', id: number, userId: number, status: string, total: number, address: string, dataFrumoasa: string, createdAt: string, updatedAt: string, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, product: { __typename?: 'Product', id: number, createdAt: string, updatedAt: string, name: string, desc: string, descSnippet: string, price: number, SKU: string, category: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } }> | null }> | null };

export type PaymentDetailsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentDetailsByUserQuery = { __typename?: 'Query', paymentDetailsByUser?: Array<{ __typename?: 'PaymentDetails', id: number, userId: number, lastCardNumberDigits: number, cardExpiryDate: string, isExpired: boolean, dataFrumoasa: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } }> | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null };

export type ProductByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ProductByNameQuery = { __typename?: 'Query', productByName?: { __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null } | null };

export type ProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, desc: string, descSnippet: string, SKU: string, category: string, price: number, imageLink?: string | null, createdAt: string, updatedAt: string, discount?: { __typename?: 'Discount', id: number, name: string, desc: string, discountPercent: number, createdAt: string, updatedAt: string } | null }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string } | null };

export type UsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, judet: string, localitate: string, address: string, telephone: number, permission?: string | null, defaultPayment?: number | null, createdAt: string, updatedAt: string }> };

export const RegularOrderFragmentDoc = gql`
    fragment RegularOrder on OrderDetails {
  id
  orderItems {
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
    quantity
  }
  userId
  status
  total
  address
  dataFrumoasa
  createdAt
  updatedAt
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
  permission
  defaultPayment
  createdAt
  updatedAt
}
    `;
export const RegularPaymentDetailsFragmentDoc = gql`
    fragment RegularPaymentDetails on PaymentDetails {
  id
  userId
  user {
    ...RegularUser
  }
  lastCardNumberDigits
  cardExpiryDate
  isExpired
  dataFrumoasa
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}`;
export const RegularProductFragmentDoc = gql`
    fragment RegularProduct on Product {
  id
  name
  desc
  descSnippet
  SKU
  category
  price
  imageLink
  discount {
    id
    name
    desc
    discountPercent
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
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
export const ChangeKnownPasswordDocument = gql`
    mutation ChangeKnownPassword($oldPassword: String!, $newPassword: String!) {
  changeKnownPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangeKnownPasswordMutation() {
  return Urql.useMutation<ChangeKnownPasswordMutation, ChangeKnownPasswordMutationVariables>(ChangeKnownPasswordDocument);
};
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
export const CreatePaymentDetailsDocument = gql`
    mutation CreatePaymentDetails($input: PaymentDetailsInput!) {
  createPaymentDetails(input: $input) {
    errors {
      ...RegularError
    }
    paymentDetails {
      ...RegularPaymentDetails
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPaymentDetailsFragmentDoc}`;

export function useCreatePaymentDetailsMutation() {
  return Urql.useMutation<CreatePaymentDetailsMutation, CreatePaymentDetailsMutationVariables>(CreatePaymentDetailsDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    errors {
      ...RegularError
    }
    product {
      ...RegularProduct
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProductFragmentDoc}`;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const CreateUserPermissionDocument = gql`
    mutation CreateUserPermission($userId: Int!, $permission: String!) {
  createUserPermission(userId: $userId, permission: $permission) {
    errors {
      ...RegularError
    }
    userPermission {
      userId
      permission
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useCreateUserPermissionMutation() {
  return Urql.useMutation<CreateUserPermissionMutation, CreateUserPermissionMutationVariables>(CreateUserPermissionDocument);
};
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($id: Int!) {
  deleteCartItem(id: $id)
}
    `;

export function useDeleteCartItemMutation() {
  return Urql.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument);
};
export const DeletePaymentDetailsDocument = gql`
    mutation DeletePaymentDetails($id: Int!) {
  deletePaymentDetails(id: $id)
}
    `;

export function useDeletePaymentDetailsMutation() {
  return Urql.useMutation<DeletePaymentDetailsMutation, DeletePaymentDetailsMutationVariables>(DeletePaymentDetailsDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id)
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const DeleteUserPermissionDocument = gql`
    mutation DeleteUserPermission($userId: Int!) {
  deleteUserPermission(userId: $userId)
}
    `;

export function useDeleteUserPermissionMutation() {
  return Urql.useMutation<DeleteUserPermissionMutation, DeleteUserPermissionMutationVariables>(DeleteUserPermissionDocument);
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
export const SetDefaultPaymentDocument = gql`
    mutation SetDefaultPayment($paymentDetailsId: Int!) {
  setDefaultPayment(paymentDetailsId: $paymentDetailsId)
}
    `;

export function useSetDefaultPaymentMutation() {
  return Urql.useMutation<SetDefaultPaymentMutation, SetDefaultPaymentMutationVariables>(SetDefaultPaymentDocument);
};
export const SetOrderStatusDocument = gql`
    mutation SetOrderStatus($orderId: Int!, $orderStatus: String!) {
  setOrderStatus(orderId: $orderId, orderStatus: $orderStatus) {
    errors {
      ...RegularError
    }
    orderDetails {
      ...RegularOrder
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularOrderFragmentDoc}`;

export function useSetOrderStatusMutation() {
  return Urql.useMutation<SetOrderStatusMutation, SetOrderStatusMutationVariables>(SetOrderStatusDocument);
};
export const UpdateOrderStatusDocument = gql`
    mutation UpdateOrderStatus($orderId: Int!, $cancelOrder: Boolean) {
  updateOrderStatus(orderId: $orderId, cancelOrder: $cancelOrder) {
    errors {
      ...RegularError
    }
    orderDetails {
      ...RegularOrder
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularOrderFragmentDoc}`;

export function useUpdateOrderStatusMutation() {
  return Urql.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: Int!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    product {
      ...RegularProduct
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProductFragmentDoc}`;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: Int!, $input: EditInput!) {
  updateUser(id: $id, input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
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
export const MyPermissionDocument = gql`
    query MyPermission {
  myPermission {
    permission
  }
}
    `;

export function useMyPermissionQuery(options?: Omit<Urql.UseQueryArgs<MyPermissionQueryVariables>, 'query'>) {
  return Urql.useQuery<MyPermissionQuery>({ query: MyPermissionDocument, ...options });
};
export const OrderByIdDocument = gql`
    query OrderById($id: Int!) {
  orderById(id: $id) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

export function useOrderByIdQuery(options: Omit<Urql.UseQueryArgs<OrderByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<OrderByIdQuery>({ query: OrderByIdDocument, ...options });
};
export const OrdersDocument = gql`
    query orders($limit: Int!, $cursor: String) {
  orders(limit: $limit, cursor: $cursor) {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

export function useOrdersQuery(options: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options });
};
export const OrdersByUserDocument = gql`
    query OrdersByUser {
  ordersByUser {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

export function useOrdersByUserQuery(options?: Omit<Urql.UseQueryArgs<OrdersByUserQueryVariables>, 'query'>) {
  return Urql.useQuery<OrdersByUserQuery>({ query: OrdersByUserDocument, ...options });
};
export const PaymentDetailsByUserDocument = gql`
    query PaymentDetailsByUser {
  paymentDetailsByUser {
    ...RegularPaymentDetails
  }
}
    ${RegularPaymentDetailsFragmentDoc}`;

export function usePaymentDetailsByUserQuery(options?: Omit<Urql.UseQueryArgs<PaymentDetailsByUserQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentDetailsByUserQuery>({ query: PaymentDetailsByUserDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductByNameDocument = gql`
    query ProductByName($name: String!) {
  productByName(name: $name) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useProductByNameQuery(options: Omit<Urql.UseQueryArgs<ProductByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductByNameQuery>({ query: ProductByNameDocument, ...options });
};
export const ProductsDocument = gql`
    query Products($limit: Int!, $cursor: String) {
  products(limit: $limit, cursor: $cursor) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  userById(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
export const UsersDocument = gql`
    query Users($limit: Int!, $cursor: String) {
  users(limit: $limit, cursor: $cursor) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};