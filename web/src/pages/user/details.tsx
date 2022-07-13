import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { useMeQuery, useOrdersByUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import NextLink from "next/link";

const Details = () => {
  const [{ data }] = useMeQuery({ pause: isServer() });
  return (
    <>
      <Layout variant={"user"}>
        <Flex>
          <Heading mb={10}>Contul meu</Heading>
        </Flex>
        <Flex align="center">
          <Box>
            <Text>Alias: {data?.me?.username}</Text>
            <Text>
              Nume: {data?.me?.firstName} {data?.me?.lastName}
            </Text>
            <Text>Email: {data?.me?.email}</Text>
            <Text>Telefon: 0{data?.me?.telephone}</Text>
            <Text>
              Adresa: {data?.me?.address}, {data?.me?.localitate},{" "}
              {data?.me?.judet}
            </Text>
          </Box>
        </Flex>
        <Flex mt={5}>
          <NextLink href="/user/editUser">
            <Button bgColor={"primary"}>Editeaza datele tale</Button>
          </NextLink>
          <NextLink href="/user/changePassword">
            <Button bgColor={"primary"} ml={"auto"}>
              Schimba parola
            </Button>
          </NextLink>
        </Flex>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Details);
