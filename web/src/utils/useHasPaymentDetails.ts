import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePaymentDetailsByUserQuery } from "../generated/graphql";

export const useHasPaymentDetails = () => {
  const [{ data, fetching }] = usePaymentDetailsByUserQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.paymentDetailsByUser) {
      router.replace("/newCard?next=/cart/products");
    }
  }, [data, fetching, router]);
};
