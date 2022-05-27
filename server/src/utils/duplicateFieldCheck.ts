export const duplicateFieldCheck = (err: any) => {
  if (err.code === "23505") {
    let field = /\((\w+)/g.exec(err.detail)![1];
    return {
      errors: [
        {
          field,
          message:
            field.charAt(0).toUpperCase() + field.slice(1) + " already exists",
        },
      ],
    };
  }

  return null;
};
