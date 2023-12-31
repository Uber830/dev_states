import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

//const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const registerSchema = Type.Object(
  {
    firtsname: Type.String({
      minLength: 5,
      maxLength: 50,
      errorMessage: {
        type: "The type characteristic is format string",
        minLength: "The type must have a minimum length of 5",
        maxLength: "The type must have a maximum length of 50",
      },
    }),
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "The type email is format string",
        format: "email address is required",
      },
    }), //solo letras,numeros, mininum 6
    password: Type.String({
      format: "password",
      pattern: "^[a-zA-Z0-9]+$",
      minLength: 6,
      errorMessage: {
        type: "El tipo de password debe ser una cadena.",
        format: "El formato de password es inválido",
        minLength: "The type must have a minimum length of 6",
        pattern: "Solo letras y números de 0 - 9",
      },
    }),
    id_role: Type.Integer({
      minimum: 1,
      maximum: 3,
      errorMessage: {
        type: "The type characteristic is format string",
        minimum: "The type must have a minimum of 2",
        maximum: "The type must have a maximum of 3",
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
        password: "The password is required",
        id_role: "The id role is required",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true }); // instantiate ajv
addFormats(ajv, ["email", "password"]);
addErrors(ajv);

const validate = ajv.compile(registerSchema);

const registerValidate = (req, res, next) => {
  const isDtoValid = validate(req.body);

  if (!isDtoValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export { registerValidate };
