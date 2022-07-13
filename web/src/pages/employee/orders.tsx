import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { OrdersTable } from "../../components/OrdersTable";
import { useIsEmployee } from "../../utils/useIsEmployee";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  useIsEmployee();
  return (
    <Layout variant="angajat">
      <Flex alignItems="center">
        <Heading>Comenzi</Heading>
      </Flex>
      <Box mt={10}>
        <OrdersTable />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Orders);
