import React, { useState } from "react";
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
  const [judet, setJudet] = useState("");

  const change = (event) => {
    setJudet(event.target.value);
  };
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
          values.judet = judet;
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
                placeholder="parola"
                label="Parola"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField name="firstName" placeholder="nume" label="Nume" />
            </Box>
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="prenume"
                label="Prenume"
              />
            </Box>
            <Box mt={4}>
              <FormControl>
                <FormLabel htmlFor="judet">Judet</FormLabel>
                <Select
                  id="judet"
                  name="judet"
                  placeholder="Selecteaza.."
                  onChange={change}
                >
                  <option value="Alba">Alba</option>
                  <option value="Arad">Arad</option>
                  <option value="Argeș">Argeș</option>
                  <option value="Bacău">Bacău</option>
                  <option value="Bihor">Bihor</option>
                  <option value="Bistrița-Năsăud">Bistrița-Năsăud</option>
                  <option value="Botoșani">Botoșani</option>
                  <option value="Brăila">Brăila</option>
                  <option value="Brașov">Brașov</option>
                  <option value="București">București</option>
                  <option value="Buzău">Buzău</option>
                  <option value="Călărași">Călărași</option>
                  <option value="Caraș-Severin">Caraș-Severin</option>
                  <option value="Cluj">Cluj</option>
                  <option value="Constanța">Constanța</option>
                  <option value="Covasna">Covasna</option>
                  <option value="Dâmbovița">Dâmbovița</option>
                  <option value="Dolj">Dolj</option>
                  <option value="Galați">Galați</option>
                  <option value="Giurgiu">Giurgiu</option>
                  <option value="Gorj">Gorj</option>
                  <option value="Harghita">Harghita</option>
                  <option value="Hunedoara">Hunedoara</option>
                  <option value="Ialomița">Ialomița</option>
                  <option value="Iași">Iași</option>
                  <option value="Ilfov">Ilfov</option>
                  <option value="Maramureș">Maramureș</option>
                  <option value="Mehedinți">Mehedinți</option>
                  <option value="Mureș">Mureș</option>
                  <option value="Neamț">Neamț</option>
                  <option value="Olt">Olt</option>
                  <option value="Prahova">Prahova</option>
                  <option value="Salăj">Salăj</option>
                  <option value="Satu Mare">Satu Mare</option>
                  <option value="Sibiu">Sibiu</option>
                  <option value="Suceava">Suceava</option>
                  <option value="Teleorman">Teleorman</option>
                  <option value="Timiș">Timiș</option>
                  <option value="Tulcea">Tulcea</option>
                  <option value="Vâlcea">Vâlcea</option>
                  <option value="Vaslui">Vaslui</option>
                  <option value="Vrancea">Vrancea</option>
                </Select>
              </FormControl>
            </Box>
            <Box mt={4}>
              <InputField
                name="localitate"
                placeholder="localitate"
                label="Localitate"
              />
            </Box>
            <Box mt={4}>
              <InputField name="address" placeholder="adresa" label="Adresa" />
            </Box>
            <Box mt={4}>
              <InputField
                name="telephone"
                placeholder="numar de telefon"
                label="Numar de telefon"
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
              Inregistreaza-te
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(register);
