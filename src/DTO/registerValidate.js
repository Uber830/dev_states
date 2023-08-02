import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const registerSchema = Type.Object(
  {
    firtsname: Type.String({
      errorMessage: {
        type: "The type firtsname is format string",
      },
    }),
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
        firtsname: "El firtsname es requerido",
        email: "El email es requerido",
        password: "El password es requerido",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true }); // instantiate ajv
addFormats(ajv, ["email"]);
addErrors(ajv);
const validate = ajv.compile(registerSchema);

const registerValidate = (req, res, next) => {
  const isDtoValid = validate(req.body);

  if (!isDtoValid) return res.sendStatus(400);

  next();
};

export { registerValidate };
