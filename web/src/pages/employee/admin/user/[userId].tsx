import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../../../components/Layout";
import { useUserByIdQuery } from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";

const User: NextPage<{ userId: string }> = () => {
  const router = useRouter();
  const [{ data }] = useUserByIdQuery({
    variables: { id: parseInt(router.query.userId as string) },
  });
  return (
    <>
      <Layout variant={"regular"}>
        <Flex>
          <Heading mb={10}>{data?.userById?.username}</Heading>
        </Flex>
        <Flex align="center">
          <Box>
            <Text>
              Nume: {data?.userById?.firstName} {data?.userById?.lastName}
            </Text>
            <Text>Email: {data?.userById?.email}</Text>
            <Text>Telefon: 0{data?.userById?.telephone}</Text>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(User);
