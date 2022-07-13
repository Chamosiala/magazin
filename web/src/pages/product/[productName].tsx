import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import {
  useCreateCartItemMutation,
  useMeQuery,
  useProductByNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

const Product: NextPage<{ productName: string }> = () => {
  const router = useRouter();
  const [, createCartItem] = useCreateCartItemMutation();
  const [{ data: meData }] = useMeQuery({ pause: isServer() });
  const [{ data: productData, fetching: productFetching }] =
    useProductByNameQuery({
      variables: {
        name:
          typeof router.query.productName === "string"
            ? router.query.productName
            : "",
      },
    });
  return (
    <Layout>
      <Box>
        <Flex mb={5}>
          <Heading>{productData?.productByName?.name}</Heading>
        </Flex>
        <Flex>
          <Image
            mb={5}
            boxSize="368px"
            objectFit="cover"
            src={productData?.productByName!.imageLink ?? ""}
          ></Image>
          <Box ml="auto">
            <Text fontSize="2xl" color="accent" mb={5}>
              {productData?.productByName?.price} Lei
            </Text>
            <Button
              bgColor={"primary"}
              onClick={() => {
                createCartItem({
                  input: {
                    userId: meData!.me!.id,
                    productId: productData!.productByName!.id,
                    quantity: 1,
                  },
                });
              }}
              isLoading={productFetching}
            >
              Adauga in cos
            </Button>
          </Box>
        </Flex>

        <Text>{productData?.productByName?.desc}</Text>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Product);
