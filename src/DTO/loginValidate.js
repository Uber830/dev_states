import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

//login
const loginDtoSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "The type email is format string",
        format: "email address is required",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "The password type is format string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "Tiene que se un objeto",
      additionalProperties: "El formato del objeto no es valido",
      required: {
        email: "El email es requerido",
        password: "El password es requerido",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv);
const validate = ajv.compile(loginDtoSchema);

const loginValidate = (req, res, next) => {
  const isDtoValid = validate(req.body);

  if (!isDtoValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export { loginValidate };
