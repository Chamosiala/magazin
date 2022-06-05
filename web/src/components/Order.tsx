import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface ProductProps {
  order: any;
}

export const Order: React.FC<ProductProps> = ({ order }) => {
  return (
    <Stack spacing={8}>
      <Box p={5} width="590px" shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Comanda nr. {order.id}</Heading>
        <Flex>
          <Text mt={4}>
            Plasata pe: {order.dataFrumoasa} | Total: {order.total} Lei
          </Text>
          <NextLink href={`/order/${order.id}`}>
            <Button ml="auto" width="145px">
              Detalii comanda
            </Button>
          </NextLink>
        </Flex>
      </Box>
    </Stack>
  );
};
