import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Link,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Product, useDeleteProductMutation } from "../generated/graphql";

interface ProductsTableBodyProps {
  products: Product[];
}

export const ProductsTableBody: React.FC<ProductsTableBodyProps> = ({
  products,
}) => {
  const [, deleteProduct] = useDeleteProductMutation();
  return (
    <Tbody>
      {products.map((product) =>
        !product ? (
          <Tr>Niciun produs</Tr>
        ) : (
          <Tr key={product.id}>
            <Td>
              <NextLink
                href="/product/[productName]"
                as={`/product/${product.name}`}
              >
                <Link>{product.id}</Link>
              </NextLink>
            </Td>
            <Td>
              <NextLink
                href="/product/[productName]"
                as={`/product/${product.name}`}
              >
                <Link>{product.name}</Link>
              </NextLink>
            </Td>
            <Td>{product.SKU}</Td>
            <Td>{product.price} Lei</Td>
            <Flex>
              <NextLink
                href="/product/edit/[id]"
                as={`/product/edit/${product.id}`}
              >
                <IconButton
                  mr={2}
                  bgColor="primary"
                  aria-label="Edit product"
                  icon={<EditIcon />}
                />
              </NextLink>
              <IconButton
                mr={2}
                colorScheme="red"
                onClick={() => {
                  deleteProduct({ id: product.id });
                }}
                aria-label="Delete product"
                icon={<DeleteIcon />}
              />
            </Flex>
          </Tr>
        )
      )}
    </Tbody>
  );
};
