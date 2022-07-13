import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { Order } from "../../components/Order";
import { PaymentDetails as PaymentDetailsComponent } from "../../components/PaymentDetails";
import {
  PaymentDetails as PaymentDetailsType,
  useDeletePaymentDetailsMutation,
  useMeQuery,
  useOrdersByUserQuery,
  usePaymentDetailsByUserQuery,
  useSetDefaultPaymentMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import NextLink from "next/link";
import { useRouter } from "next/router";

const PaymentDetails = () => {
  const router = useRouter();
  const [{ data }] = usePaymentDetailsByUserQuery();
  const [, setDefaultPayment] = useSetDefaultPaymentMutation();
  const [, deletePaymentDetails] = useDeletePaymentDetailsMutation();
  return (
    <>
      <Layout variant={"user"}>
        <Flex>
          <Heading mb={4}>Cardurile mele</Heading>
          <NextLink href={"/newCard?next=" + router.pathname}>
            <Button ml="auto" my="auto" bgColor="primary">
              Adauga card
            </Button>
          </NextLink>
        </Flex>
        <Flex>
          <Box>
            {!data?.paymentDetailsByUser ? (
              <div>Niciun card</div>
            ) : (
              <Grid
                h="auto"
                templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
                gap={4}
              >
                {data!.paymentDetailsByUser!.map(
                  (paymentDetails: PaymentDetailsType) => (
                    <Flex>
                      <PaymentDetailsComponent
                        paymentDetails={paymentDetails}
                      ></PaymentDetailsComponent>
                      <Grid
                        h="auto"
                        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
                        gap={4}
                      >
                        <Button
                          onClick={() => {
                            setDefaultPayment({
                              paymentDetailsId: paymentDetails.id,
                            });
                          }}
                        >
                          Seteaza ca implicit
                        </Button>
                        <Button
                          onClick={() => {
                            setDefaultPayment({
                              paymentDetailsId: 0,
                            });
                            deletePaymentDetails({ id: paymentDetails.id });
                          }}
                          colorScheme="red"
                        >
                          Sterge
                        </Button>
                      </Grid>
                    </Flex>
                  )
                )}
              </Grid>
            )}
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(PaymentDetails);
