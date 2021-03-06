import { Box, FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useMeQuery, useUpdateUserMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import { toErrorMap } from "../../utils/toErrorMap";
import { useIsAuth } from "../../utils/useIsAuth";

interface editUserProps {}

const editUser: React.FC<editUserProps> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const router = useRouter();
  const [, updateUser] = useUpdateUserMutation();
  const [judet, setJudet] = useState("");

  const change = (event) => {
    setJudet(event.target.value);
  };
  if (fetching) {
    return <div>loading...</div>;
  } else {
    return (
      <Layout variant="small">
        <Formik
          initialValues={{
            email: data?.me?.email!,
            firstName: data?.me?.firstName!,
            lastName: data?.me?.lastName!,
            judet: data?.me?.judet!,
            localitate: data?.me?.localitate!,
            address: data?.me?.address!,
            telephone: data?.me?.telephone.toString()!,
          }}
          onSubmit={async (values, { setErrors }) => {
            values.judet = judet;
            console.log(values);
            const response = await updateUser({
              id: data!.me!.id,
              input: { ...values, telephone: parseInt(values.telephone!) },
            });
            if (response.data?.updateUser!.errors) {
              setErrors(toErrorMap(response.data.updateUser.errors));
            } else if (response.data?.updateUser!.user) {
              router.push("/user/details");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
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
                    placeholder={data?.me?.judet}
                    onChange={change}
                  >
                    <option value="Alba">Alba</option>
                    <option value="Arad">Arad</option>
                    <option value="Arge??">Arge??</option>
                    <option value="Bac??u">Bac??u</option>
                    <option value="Bihor">Bihor</option>
                    <option value="Bistri??a-N??s??ud">Bistri??a-N??s??ud</option>
                    <option value="Boto??ani">Boto??ani</option>
                    <option value="Br??ila">Br??ila</option>
                    <option value="Bra??ov">Bra??ov</option>
                    <option value="Bucure??ti">Bucure??ti</option>
                    <option value="Buz??u">Buz??u</option>
                    <option value="C??l??ra??i">C??l??ra??i</option>
                    <option value="Cara??-Severin">Cara??-Severin</option>
                    <option value="Cluj">Cluj</option>
                    <option value="Constan??a">Constan??a</option>
                    <option value="Covasna">Covasna</option>
                    <option value="D??mbovi??a">D??mbovi??a</option>
                    <option value="Dolj">Dolj</option>
                    <option value="Gala??i">Gala??i</option>
                    <option value="Giurgiu">Giurgiu</option>
                    <option value="Gorj">Gorj</option>
                    <option value="Harghita">Harghita</option>
                    <option value="Hunedoara">Hunedoara</option>
                    <option value="Ialomi??a">Ialomi??a</option>
                    <option value="Ia??i">Ia??i</option>
                    <option value="Ilfov">Ilfov</option>
                    <option value="Maramure??">Maramure??</option>
                    <option value="Mehedin??i">Mehedin??i</option>
                    <option value="Mure??">Mure??</option>
                    <option value="Neam??">Neam??</option>
                    <option value="Olt">Olt</option>
                    <option value="Prahova">Prahova</option>
                    <option value="Sal??j">Sal??j</option>
                    <option value="Satu Mare">Satu Mare</option>
                    <option value="Sibiu">Sibiu</option>
                    <option value="Suceava">Suceava</option>
                    <option value="Teleorman">Teleorman</option>
                    <option value="Timi??">Timi??</option>
                    <option value="Tulcea">Tulcea</option>
                    <option value="V??lcea">V??lcea</option>
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
                <InputField
                  name="address"
                  placeholder="adresa"
                  label="Adresa"
                />
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
                Actualizeaza
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient)(editUser);
