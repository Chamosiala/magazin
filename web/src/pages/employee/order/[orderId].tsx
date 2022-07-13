import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";
import { useOrderByIdQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const Order: NextPage<{ orderId: string }> = () => {
  const router = useRouter();
  const [{ data }] = useOrderByIdQuery({
    variables: {
      id:
        typeof router.query.orderId === "string"
          ? parseInt(router.query.orderId as string)
          : 0,
    },
  });
  return (
    <Layout variant={"regular"}>
      <Flex>
        <Heading mb={15}>Comanda nr. {router.query.orderId}</Heading>
      </Flex>
      <Flex>
        <Box>
          <Stack mt={15} spacing={8}>
            <Box mb={4} p={5} width="590px" shadow="md" borderWidth="1px">
              <Flex>
                <Text width="155px">Plasata pe: </Text>
                <Text fontWeight={"bold"}>{data?.orderById?.dataFrumoasa}</Text>
              </Flex>
              <Flex>
                <Text width="155px">Total:</Text>
                <Text fontWeight={"bold"}>{data?.orderById?.total} Lei</Text>
              </Flex>
              <Flex>
                <Text width="155px">Status:</Text>
                <Text fontWeight={"bold"}>{data?.orderById?.status}</Text>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Order);
