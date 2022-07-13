import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import NextLink from "next/link";
import { useIsAdmin } from "../../../utils/useIsAdmin";
import { UsersTable } from "../../../components/UsersTable";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  useIsAdmin();
  return (
    <Layout variant="angajat">
      <Flex alignItems="center">
        <Heading>Utilizatori</Heading>
      </Flex>
      <Box mt={10}>
        <UsersTable />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Users);
