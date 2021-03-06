import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

const Index = () => {
  const [{ data }] = useMeQuery({ pause: isServer() });
  return (
    <>
      <Layout variant={"angajat"}>
        <Flex>
          <Heading>Contul meu</Heading>
        </Flex>
        <Flex align="center">
          <Box>
            <Text>Alias: {data?.me?.username}</Text>
            <Text>
              Nume: {data?.me?.firstName} {data?.me?.lastName}
            </Text>
            <Text>Email: {data?.me?.email}</Text>
            <Text>Telefon: 0{data?.me?.telephone}</Text>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
