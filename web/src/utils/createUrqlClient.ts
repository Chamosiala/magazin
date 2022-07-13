import { cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
  CartItemsByUserQuery,
  CartItemsDocument,
  CartItemsQuery,
  CreateCartItemMutation,
  DeleteCartItemMutationVariables,
  DeletePaymentDetailsMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("Not authenticated")) {
          Router.replace("/login");
        } else if (error?.message.includes("Permission denied")) {
          alert("Permission denied");
          Router.replace("/");
        } else if (error?.message.includes("order")) {
          Router.replace("/user/orders");
        }
      })
    );
  };

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          createCartItem: (_result, _args, cache, _info) => {
            betterUpdateQuery<CreateCartItemMutation, CartItemsByUserQuery>(
              cache,
              { query: CartItemsDocument },
              _result,
              (result, query) => {
                query.cartItemsByUser.push(result.createCartItem.cartItem!);
                return query;
              }
            );
          },
          deleteCartItem: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "CartItem",
              id: (args as DeleteCartItemMutationVariables).id,
            });
          },
          deletePaymentDetails: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "PaymentDetails",
              id: (args as DeletePaymentDetailsMutationVariables).id,
            });
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
