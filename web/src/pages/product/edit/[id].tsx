import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { TextareaField } from "../../../components/TextareaField";
import {
  useProductQuery,
  useUpdateProductMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";

interface EditProductProps {}

const editProduct: React.FC<EditProductProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [{ data: productData, fetching }] = useProductQuery({
    variables: {
      id: typeof router.query.id === "string" ? parseInt(router.query.id) : 0,
    },
  });
  const [, updateProduct] = useUpdateProductMutation();
  if (fetching) {
    return <div>Loading...</div>;
  }
  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          name: productData!.product!.name,
          desc: productData!.product!.desc,
          SKU: productData!.product!.SKU,
          category: productData!.product!.category,
          price: productData!.product!.price,
          imageLink: productData!.product!.imageLink!,
        }}
        onSubmit={async (values) => {
          await updateProduct({
            id:
              typeof router.query.id === "string"
                ? parseInt(router.query.id)
                : 0,
            input: values,
          });
          router.push("/employee/products");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="name" placeholder="nume" label="Nume" />
            </Box>
            <Box mt={4}>
              <TextareaField
                name="desc"
                placeholder="descriere"
                label="Descriere"
              />
            </Box>
            <Box mt={4}>
              <InputField name="SKU" placeholder="SKU" label="SKU" />
            </Box>
            <Box mt={4}>
              <InputField
                name="imageLink"
                placeholder="Link Imagine"
                label="Link Imagine"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="category"
                placeholder="categorie"
                label="Categorie"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="price"
                placeholder="pret"
                label="Pret"
                type="number"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Actualizeaza produsul
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(editProduct);
