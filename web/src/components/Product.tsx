import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import {
  Product as _product,
  useCreateCartItemMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

interface ProductProps {
  product: _product;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [, createCartItem] = useCreateCartItemMutation();
  return (
    <Box width="180px" height="310px">
      <Box textAlign={"center"}>
        <NextLink href={`/product/${product.name}`}>
          <Image
            cursor={"pointer"}
            mx={"auto"}
            maxWidth="128.5px"
            maxHeight="128.5px"
            src="https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZWRpZ2lhbmltYWx3b3JsZC5y/Y3MtcmRzLnJvJTJGc3RvcmFnZSUyRjIw/MTklMkYwMiUyRjI4JTJGMTA0NzU0Nl8x/MDQ3NTQ2X2Jyb2FzY2EtbWljYS0xLmpw/ZyZ3PTc4MCZoPTYwMCZ6Yz0xJmhhc2g9/ZmUyYTk3NWQwZmE5YzAzMTJmZTE5NWYxYmM4ZTQ3NTc=.thumb.jpg"
          ></Image>
        </NextLink>

        <Box>
          <NextLink href={`/product/${product.name}`}>
            <Text cursor={"pointer"}>{product.name}</Text>
          </NextLink>
          <Text>{product.price} Lei</Text>
        </Box>
        <Button
          onClick={() => {
            createCartItem({
              input: {
                userId: data!.me!.id,
                productId: product.id,
                quantity: 1,
              },
            });
          }}
          isLoading={fetching}
          bgColor={"primary"}
        >
          Adaugă
        </Button>
      </Box>
    </Box>
  );
};
