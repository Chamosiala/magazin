import { Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export type WrapperVariant = "small" | "regular" | "user";

interface WrapperProps {
  variant?: "small" | "regular" | "user";
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
