import { Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { CartItem } from "../../components/CartItem";
import { Layout } from "../../components/Layout";
import { useCartItemsByUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Products = () => {
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
            <Link ml="auto">Magazin</Link>
          </Heading>
        </NextLink>
      </Flex>

      {!data ? (
        <div>Loading...</div>
      ) : (
        <Grid
          h="200px"
          templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
          gap={4}
        >
          {data!.cartItemsByUser.map((p) => (
            <CartItem key={p.id} cartItem={p}></CartItem>
          ))}
        </Grid>
      )}
      <Flex>
        <NextLink href="/cart/checkout">
          <Link mt="auto" ml="auto">
            Total: {price} Continua
          </Link>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Products);
