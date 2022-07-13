import { Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export type WrapperVariant = "small" | "regular" | "user" | "angajat";

interface WrapperProps {
  variant?: "small" | "regular" | "user" | "angajat";
  children: any;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Flex>
      {variant === "user" && (
        <VStack mt={20}>
          <NextLink href="/user/details">
            <Button width="145px">Datele mele</Button>
          </NextLink>
          <NextLink href="/user/orders">
            <Button width="145px">Comenzile mele</Button>
          </NextLink>
          <NextLink href="/user/paymentDetails">
            <Button width="145px">Cardurile mele</Button>
          </NextLink>
        </VStack>
      )}
      {variant === "angajat" && (
        <VStack mt={20}>
          <NextLink href="/employee/orders">
            <Button width="145px">Comenzi</Button>
          </NextLink>
          <NextLink href="/employee/products">
            <Button width="145px">Produse</Button>
          </NextLink>
          <NextLink href="/employee/admin/users">
            <Button width="145px">Utilizatori</Button>
          </NextLink>
        </VStack>
      )}
      <Box
        mt="8"
        mx="auto"
        maxW={variant === "small" ? "400px" : "800px"}
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
};
