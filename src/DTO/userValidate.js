import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const userUpdateSchema = Type.Object(
  {
    cc: Type.Optional(
      Type.Number({
        minimum: 10,
        maximum: 10000000000,
        errorMessage: {
        type: "The type must be a Integer",
        minimum: "minima longitud 10000000000",
        maximum: "maxima longitud 10000000000",
      },
      })
    ),
    firtsname: Type.Optional(
      Type.String({
        minLength: 4,
        maxLength: 50,
        errorMessage: {
          type: "The type characteristic is format string",
          minLength: "The type must have a minimum length of 4",
          maxLength: "The type must have a maximum length of 50",
        },
      })
    ),
    lastname: Type.Optional(
      Type.String({
        minLength: 5,
        maxLength: 50,
        errorMessage: {
          type: "The type characteristic is format string",
          minLength: "The type must have a minimum length of 5",
          maxLength: "The type must have a maximum length of 50",
        },
      })
    ),
    email: Type.Optional(
      Type.String({
        format: "email",
        errorMessage: {
          type: "The type email is format string",
          format: "Email address is required",
        },
      })
    ),
    password: Type.Optional(
      Type.String({
        format: "password",
        pattern: "^[a-zA-Z0-9]+$",
        minLength: 6,
        errorMessage: {
          type: "El tipo de password debe ser una cadena.",
          format: "El formato de password es inválido",
          minLength: "The type must have a minimum length of 6",
          pattern: "Solo letras y números de 0 - 9",
        },
      })
    ),
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

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email", "password"]);
addErrors(ajv);

const validate = ajv.compile(userUpdateSchema);

/**
 * This middleware is responsible for verifying if the user inserted
 * the data in form correctly.
 * @param {Object} req
 * @param {String} res
 * @param {*} next
 * @returns Error message or access the next method.
 */

const userValidate = (req, res, next) => {
  // Transform the data to the correct type
  for (let [key, value] of Object.entries(req?.body)) {
    
    if (key === "cc") {
      req.body[key] = Number(value);
    }
  }

  const isUserByUpdate = validate(req?.body);

  if (!isUserByUpdate) {
    return res
      .status(404)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  }

  next();
};

export { userValidate };
