import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useCreatePaymentDetailsMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";

interface PaymentDetailsFormProps {}

export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({}) => {
  const [, createPaymentDetails] = useCreatePaymentDetailsMutation();

  const changeMonth = (event) => {
    setExpiryDateMonth(event.target.value);
  };

  const changeYear = (event) => {
    setExpiryDateYear(event.target.value);
  };

  let currentYear = new Date().getFullYear();
  const [expiryDateMonth, setExpiryDateMonth] = useState(1);
  const [expiryDateYear, setExpiryDateYear] = useState(currentYear);

  return (
    <Formik
      initialValues={{
        cardNumber: "4444444444444444",
        cardSecurityCode: "0",
      }}
      onSubmit={async (values, { setErrors }) => {
        const expiryDate = new Date(expiryDateYear, expiryDateMonth - 1);
        const response = await createPaymentDetails({
          input: {
            cardNumber: parseInt(values.cardNumber),
            cardSecurityCode: parseInt(values.cardSecurityCode),
            cardExpiryDate: expiryDate,
          },
        });
        if (response.data?.createPaymentDetails.errors) {
          console.log("error!!!");
          setErrors(toErrorMap(response.data.createPaymentDetails.errors));
        } else if (response.data?.createPaymentDetails.paymentDetails) {
          // router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mt={4}>
            <InputField
              name="cardNumber"
              placeholder="ex: 4444 4444 4444 4444"
              label="Numărul cardului"
              type="tel"
              maxLength={16}
            />
            <InputField
              name="cardSecurityCode"
              placeholder="CVV/CVV2"
              label="Cod Securitate"
              type="tel"
              maxLength={4}
            />
            <FormControl>
              <FormLabel htmlFor="cardExpiryDate">Data expirarii</FormLabel>
              <Select id="month" name="month" onChange={changeMonth}>
                <option value={1}>01</option>
                <option value={2}>02</option>
                <option value={3}>03</option>
                <option value={4}>04</option>
                <option value={5}>05</option>
                <option value={6}>06</option>
                <option value={7}>07</option>
                <option value={8}>08</option>
                <option value={9}>09</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </Select>
              <Select id="year" name="year" onChange={changeYear}>
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear + 1}>{currentYear + 1}</option>
                <option value={currentYear + 2}>{currentYear + 2}</option>
                <option value={currentYear + 3}>{currentYear + 3}</option>
                <option value={currentYear + 4}>{currentYear + 4}</option>
                <option value={currentYear + 5}>{currentYear + 5}</option>
                <option value={currentYear + 6}>{currentYear + 6}</option>
                <option value={currentYear + 7}>{currentYear + 7}</option>
                <option value={currentYear + 8}>{currentYear + 8}</option>
                <option value={currentYear + 9}>{currentYear + 9}</option>
                <option value={currentYear + 10}>{currentYear + 10}</option>
              </Select>
            </FormControl>
          </Box>
          <Button
            mt={4}
            isLoading={isSubmitting}
            type="submit"
            colorScheme="teal"
          >
            Adauga card
          </Button>
        </Form>
      )}
    </Formik>
  );
};
