import { EditInput } from "../resolvers/user";

export const validateUserUpdate = (options: EditInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.telephone > 9999999999 || options.telephone < 100000000) {
    return [
      {
        field: "telephone",
        message: "Invalid phone number",
      },
    ];
  }

  return null;
};
