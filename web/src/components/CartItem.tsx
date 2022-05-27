import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  CartItem as _cartItem,
  useDeleteCartItemMutation,
  useProductQuery,
} from "../generated/graphql";

interface CartItemProps {
  cartItem: _cartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const [, deleteCartItem] = useDeleteCartItemMutation();
  const [{ data }] = useProductQuery({ variables: { id: cartItem.productId } });
  return (
    <Box width="180px" height="310px">
      <Image
        mx={"auto"}
        maxWidth="128.5px"
        maxHeight="128.5px"
        src="https://i.imgur.com/sVH9N1X.png"
      ></Image>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Box textAlign={"center"}>
          <Text>{data.product!.name}</Text>
          <Text>{data.product!.desc}</Text>
          <Text>x{cartItem.quantity}</Text>
          <Text>{data.product!.price * cartItem.quantity} Lei</Text>
          <Button
            onClick={() => {
              deleteCartItem({ id: cartItem.id });
            }}
            colorScheme="red"
          >
            Scoate
          </Button>
        </Box>
      )}
    </Box>
  );
};
