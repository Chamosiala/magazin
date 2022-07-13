import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangeKnownPasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const changePassword = () => {
  const router = useRouter();
  const [, changeKnownPassword] = useChangeKnownPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changeKnownPassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
          if (response.data?.changeKnownPassword.errors) {
            const errorMap = toErrorMap(
              response.data.changeKnownPassword.errors
            );
            setErrors(errorMap);
          } else if (response.data?.changeKnownPassword.user) {
            router.push("/user/details");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              mb={5}
              name="oldPassword"
              placeholder="vechea parola"
              label="Vechea parola"
              type="password"
            />
            <InputField
              name="newPassword"
              placeholder="noua parola"
              label="Noua parola"
              type="password"
            />
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Schimba parola
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(changePassword);
