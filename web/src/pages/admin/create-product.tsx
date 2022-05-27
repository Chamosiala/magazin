import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { TextareaField } from "../../components/TextareaField";
import { useCreateProductMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useIsAuth } from "../../utils/useIsAuth";

interface createProductProps {}

const createProduct: React.FC<createProductProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createProduct] = useCreateProductMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          name: "",
          desc: "",
          SKU: "",
          category: "",
          price: 0,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createProduct({ input: values });
          if (response.data?.createProduct.errors) {
            setErrors(toErrorMap(response.data.createProduct.errors));
          } else if (response.data?.createProduct.product) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="name" placeholder="name" label="Name" />
            </Box>
            <Box mt={4}>
              <TextareaField
                name="desc"
                placeholder="description"
                label="Description"
              />
            </Box>
            <Box mt={4}>
              <InputField name="SKU" placeholder="SKU" label="SKU" />
            </Box>
            <Box mt={4}>
              <InputField
                name="category"
                placeholder="category"
                label="Category"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="price"
                placeholder="price"
                label="Price"
                type="number"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Create Product
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(createProduct);
