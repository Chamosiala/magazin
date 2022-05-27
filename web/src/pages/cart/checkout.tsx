import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import {
  useCartItemsByUserQuery,
  useCreateOrderDetailsMutation,
  useEmptyCartMutation,
  useMeQuery,
  useSendOrderDetailsMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

interface checkoutProps {}

const checkout: React.FC<checkoutProps> = ({}) => {
  const [, emptyCart] = useEmptyCartMutation();
  const [, sendOrderDetails] = useSendOrderDetailsMutation();
  const [{ data }] = useCartItemsByUserQuery({
    variables: {
      limit: 10,
    },
  });

  let totalPrice = 0;
  data?.cartItemsByUser.forEach((cartItem) => {
    totalPrice += cartItem.totalPrice;
  });

  const [{ data: userData }] = useMeQuery();
  const router = useRouter();
  const [, createOrderDetails] = useCreateOrderDetailsMutation();
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
              numarCard: values.numarCard,
              codSecuritate: values.codSecuritate,
              judet: userData!.me!.judet,
              address: userData!.me!.address,
              localitate: userData!.me!.localitate,
              total: totalPrice,
            },
          });
          emptyCart(); // these should be ran only when there's no errors
          sendOrderDetails({
            orderDetailsId: response.data!.createOrderDetails.orderDetails!.id,
          });
          if (response.data?.createOrderDetails.errors) {
            setErrors(toErrorMap(response.data.createOrderDetails.errors));
          } else if (response.data?.createOrderDetails.orderDetails) {
            router.push("/");
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
              <Text>{userData?.me?.address}</Text>
            </Box>
            <Box mt={4}>
              <InputField
                name="numarCard"
                placeholder="ex: 4444 4444 4444 4444"
                label="Numărul cardului"
                type="tel"
                maxLength={16}
              />
              <InputField
                name="codSecuritate"
                placeholder="CVV/CVV2"
                label="Cod Securitate"
                type="tel"
                maxLength={4}
              />
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
