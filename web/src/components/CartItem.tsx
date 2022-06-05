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
        src="https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZWRpZ2lhbmltYWx3b3JsZC5y/Y3MtcmRzLnJvJTJGc3RvcmFnZSUyRjIw/MTklMkYwMiUyRjI4JTJGMTA0NzU0Nl8x/MDQ3NTQ2X2Jyb2FzY2EtbWljYS0xLmpw/ZyZ3PTc4MCZoPTYwMCZ6Yz0xJmhhc2g9/ZmUyYTk3NWQwZmE5YzAzMTJmZTE5NWYxYmM4ZTQ3NTc=.thumb.jpg"
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
