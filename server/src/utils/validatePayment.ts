import { PaymentDetailsInput } from "../resolvers/paymentDetails";

export const validatePayment = (options: PaymentDetailsInput) => {
  if (
    options.cardSecurityCode.toString().length !== 3 &&
    options.cardSecurityCode.toString().length !== 4
  ) {
    return [
      {
        field: "cardSecurityCode",
        message: "Invalid security code",
      },
    ];
  }

  if (options.cardNumber.toString().length !== 16) {
    return [
      {
        field: "cardNumber",
        message: "Length must be 16",
      },
    ];
  }

  return null;
};
