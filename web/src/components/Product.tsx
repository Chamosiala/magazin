import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  Product as _product,
  useCreateCartItemMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface ProductProps {
  product: _product;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
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
            src={product.imageLink!}
          ></Image>
        </NextLink>

        <Box mt={2}>
          <NextLink href={`/product/${product.name}`}>
            <Text height="48px" cursor={"pointer"}>
              {product.name}
            </Text>
          </NextLink>
          <Text color="accent">{product.price} Lei</Text>
        </Box>
        <Button
          mt={"5"}
          onClick={() => {
            data?.me
              ? createCartItem({
                  input: {
                    userId: data!.me!.id,
                    productId: product.id,
                    quantity: 1,
                  },
                })
              : router.replace("/login?next=/");
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
