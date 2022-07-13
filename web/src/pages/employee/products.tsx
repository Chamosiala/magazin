import { Box, Flex, Heading } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { ProductsTable } from "../../components/ProductsTable";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  // useIsAdmin();
  return (
    <Layout variant="angajat">
      <Flex alignItems="center">
        <Heading>Produse</Heading>
        <NextLink href="/employee/admin/create-product">
          <Button bgColor={"primary"} my="auto" ml="auto">
            Creeaza Produs
          </Button>
        </NextLink>
      </Flex>
      <Box mt={10}>
        <ProductsTable />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Products);
