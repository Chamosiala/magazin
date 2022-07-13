import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { CartItem } from "../../components/CartItem";
import { Layout } from "../../components/Layout";
import { useCartItemsByUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

const Products = () => {
  useIsAuth();
  const [{ data }] = useCartItemsByUserQuery({
    variables: {
      limit: 10,
    },
  });
  let price = 0;
  data?.cartItemsByUser.forEach((cartItem) => {
    price += cartItem.totalPrice;
  });
  return (
    <Layout>
      <Flex align="center">
        <NextLink href="/">
          <Heading>
            <Text ml="auto">Cosul meu de cumparaturi</Text>
          </Heading>
        </NextLink>
      </Flex>

      {!data ? (
        <div>Loading...</div>
      ) : (
        <Grid
          h="auto"
          templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
          gap={4}
        >
          {data!.cartItemsByUser.map((p) => (
            <CartItem key={p.id} cartItem={p}></CartItem>
          ))}
        </Grid>
      )}
      <Text align={"right"} ml="auto" mb={3}>
        Total: {price} lei
      </Text>
      <Flex>
        <NextLink href="/cart/checkout">
          <Button bgColor="primary" mt="auto" ml="auto">
            Continua
          </Button>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Products);
