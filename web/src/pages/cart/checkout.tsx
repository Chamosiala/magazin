import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useRadio,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import {
  useCartItemsByUserQuery,
  useCreateOrderDetailsMutation,
  useEmptyCartMutation,
  useMeQuery,
  usePaymentDetailsByUserQuery,
  useSendOrderDetailsMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useHasPaymentDetails } from "../../utils/useHasPaymentDetails";
import { useIsAuth } from "../../utils/useIsAuth";

interface checkoutProps {}

const checkout: React.FC<checkoutProps> = ({}) => {
  useIsAuth();
  useHasPaymentDetails();
  const [, emptyCart] = useEmptyCartMutation();
  const [, sendOrderDetails] = useSendOrderDetailsMutation();
  const [{ data }] = useCartItemsByUserQuery({
    variables: {
      limit: 10,
    },
  });
  const [{ data: userData }] = useMeQuery();
  const [{ data: paymentDetailsData }] = usePaymentDetailsByUserQuery();
  const router = useRouter();
  const [, createOrderDetails] = useCreateOrderDetailsMutation();
  const [selectedCard, setSelectedCard] = useState(
    userData?.me?.defaultPayment ? userData?.me?.defaultPayment : 0
  );

  let totalPrice = 0;
  data?.cartItemsByUser.forEach((cartItem) => {
    totalPrice += cartItem.totalPrice;
  });
  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          numarCard: "4444444444444444",
          codSecuritate: "0",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createOrderDetails({
            input: {
              judet: userData!.me!.judet,
              address: userData!.me!.address,
              localitate: userData!.me!.localitate,
              total: totalPrice,
            },
          });
          if (response.data?.createOrderDetails.errors) {
            setErrors(toErrorMap(response.data.createOrderDetails.errors));
            if (selectedCard === 0) {
              alert("Alegeti o optiune de plata");
            }
          } else if (response.data?.createOrderDetails.orderDetails) {
            emptyCart();
            sendOrderDetails({
              orderDetailsId:
                response.data!.createOrderDetails.orderDetails!.id,
            });
            router.push(
              `/order/${response.data.createOrderDetails.orderDetails.id}`
            );
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Text>Nume si numar de telefon:</Text>
              <Text>
                {userData?.me?.firstName} {userData?.me?.lastName} -{" "}
                {userData?.me?.telephone}
              </Text>
              <Text>Adresa:</Text>
              <Text>
                {userData?.me?.address}, {userData?.me?.localitate},{" "}
                {userData?.me?.judet}
              </Text>
            </Box>
            <Box mt={5}>
              {!paymentDetailsData?.paymentDetailsByUser ? (
                <div>Loading...</div>
              ) : (
                <Grid
                  h="auto"
                  templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
                  gap={4}
                >
                  {paymentDetailsData!.paymentDetailsByUser!.map(
                    (paymentDetails) => (
                      <RadioGroup defaultValue={userData?.me?.defaultPayment}>
                        <Stack spacing={8}>
                          <Box
                            p={5}
                            width="590px"
                            shadow="md"
                            borderWidth="1px"
                          >
                            <Flex>
                              <Radio
                                colorScheme="accent"
                                size="lg"
                                value={paymentDetails.id}
                                onClick={() => {
                                  setSelectedCard(paymentDetails.id);
                                }}
                              >
                                <Heading fontSize="xl">
                                  **** {paymentDetails.lastCardNumberDigits}
                                </Heading>
                              </Radio>
                            </Flex>
                            <Text mt={4}>{paymentDetails.dataFrumoasa}</Text>
                          </Box>
                        </Stack>
                      </RadioGroup>
                    )
                  )}
                </Grid>
              )}
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Finalizare
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(checkout);
