import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const userUpdateSchema = Type.Object(
  {
    firtsname: Type.String({
      minLength: 4,
      maxLength: 40,
      errorMessage: {
        type: "The type characteristic is format string",
        minLength: "The type must have a minimum length of 4",
        maxLength: "The type must have a maximum length of 50",
      },
    }),
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "The type email is format string",
        format: "Email address is required",
      },
    }),
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
        minimum: "The type must have a minimum of 1",
        maximum: "The type must have a maximum of 3",
      },
    })
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
        //id_role: "The role is required"
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

const userValidateCreatings = (req, res, next) => {
  const isUserByUpdate = validate(req?.body);

  if (!isUserByUpdate) {
    return res
      .status(404)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  }

  next();
};

export { userValidateCreatings };
