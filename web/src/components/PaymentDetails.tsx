import { Box, Flex, Heading, Radio, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { PaymentDetails as PaymentDetailsType } from "../generated/graphql";

interface PaymentDetailsProps {
  paymentDetails: PaymentDetailsType;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  paymentDetails,
}) => {
  return (
    <Stack spacing={8}>
      <Box p={5} width="590px" shadow="md" borderWidth="1px">
        <Flex>
          <Heading fontSize="xl">
            **** {paymentDetails.lastCardNumberDigits}
          </Heading>
        </Flex>
        <Text mt={4}>{paymentDetails.dataFrumoasa}</Text>
      </Box>
    </Stack>
  );
};
