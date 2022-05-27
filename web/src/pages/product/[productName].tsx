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
            src="https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZWRpZ2lhbmltYWx3b3JsZC5y/Y3MtcmRzLnJvJTJGc3RvcmFnZSUyRjIw/MTklMkYwMiUyRjI4JTJGMTA0NzU0Nl8x/MDQ3NTQ2X2Jyb2FzY2EtbWljYS0xLmpw/ZyZ3PTc4MCZoPTYwMCZ6Yz0xJmhhc2g9/ZmUyYTk3NWQwZmE5YzAzMTJmZTE5NWYxYmM4ZTQ3NTc=.thumb.jpg"
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
