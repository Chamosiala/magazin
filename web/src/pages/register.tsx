import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          judet: "",
          localitate: "",
          address: "",
          telephone: "0",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await register({
            options: { ...values, telephone: parseInt(values.telephone) },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="firstName"
                placeholder="first name"
                label="First Name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="last name"
                label="Last Name"
              />
            </Box>
            <Box mt={4}>
              {/* <FormControl>
                <FormLabel htmlFor="judet">Judet</FormLabel>
                <Select id="judet" name="judet" placeholder="Selectaza..">
                  <option value="Alba">Alba</option>
                  <option>Arad</option>
                  <option>Argeș</option>
                  <option>Bacău</option>
                  <option>Bihor</option>
                  <option>Bistrița-Năsăud</option>
                  <option>Botoșani</option>
                  <option>Brăila</option>
                  <option>Brașov</option>
                  <option>București</option>
                  <option>Buzău</option>
                  <option>Călărași</option>
                  <option>Caraș-Severin</option>
                  <option>Cluj</option>
                  <option>Constanța</option>
                  <option>Covasna</option>
                  <option>Dâmbovița</option>
                  <option>Dolj</option>
                  <option>Galați</option>
                  <option>Giurgiu</option>
                  <option>Gorj</option>
                  <option>Harghita</option>
                  <option>Hunedoara</option>
                  <option>Ialomița</option>
                  <option>Iași</option>
                  <option>Ilfov</option>
                  <option>Maramureș</option>
                  <option>Mehedinți</option>
                </Select>
              </FormControl> */}
              <InputField name="judet" placeholder="judet" label="Judet" />
            </Box>
            <Box mt={4}>
              <InputField
                name="localitate"
                placeholder="localitate"
                label="Localitate"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="address"
                placeholder="address"
                label="Address"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="telephone"
                placeholder="telephone"
                label="Phone Number"
                type="tel"
                maxLength={10}
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(register);
