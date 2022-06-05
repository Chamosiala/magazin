import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { Order } from "../../components/Order";
import { useMeQuery, useOrdersByUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

const Orders = () => {
  const [{ data: ordersData }] = useOrdersByUserQuery();
  return (
    <>
      <Layout variant={"user"}>
        <Flex>
          <Heading mb={4}>Comenzile mele</Heading>
        </Flex>
        <Flex>
          <Box>
            {!ordersData ? (
              <div>Loading...</div>
            ) : (
              <Grid
                h="200px"
                templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
                gap={4}
              >
                {ordersData!.ordersByUser!.map((order) => (
                  <Order order={order}></Order>
                ))}
              </Grid>
            )}
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Orders);
