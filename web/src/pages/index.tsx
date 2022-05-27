import { Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useProductsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = useProductsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <Flex mb={5} align="center">
        <Heading>Magazin</Heading>
        <NextLink href="/admin/create-product">
          <Link ml="auto">Creeaza Produs</Link>
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
          {data.products.map((p) => (
            <Product key={p.id} product={p}></Product>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
