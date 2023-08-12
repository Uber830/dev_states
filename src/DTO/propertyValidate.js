import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormat from "ajv-formats";
import addError from "ajv-errors";

const propertySchema = Type.Object(
  {
    type: Type.String({
      minLength: 5,
      maxLength: 35,
      errorMessage: {
        type: "The type must be a string",
        minLength: "The type must have a minimum length of 5",
        maxLength: "The type must have a maximum length of 35",
      },
    }),
    address: Type.String({
      minLength: 5,
      maxLength: 30,
      errorMessage: {
        type: "The type must be a string",
        minLength: "The type must have a minimum length of 5",
        maxLength: "The type must have a maximum length of 30",
      },
    }),
    area: Type.Integer({
      minimum: 1,
      maximum: 10,
      errorMessage: {
        type: "The type must be a Integer",
        minimum: "The type must have a minimum length of 1",
        maximum: "The type must have a maximum length of 10",
      },
    }),
    price: Type.Integer({
      minimum: 6,
      maximum: 10,
      errorMessage: {
        type: "The type must be a Integer",
        minimum: "The type must have a minimum length of 6",
        maximum: "The type must have a maximum length of 10",
      },
    }),
    characteristic: Type.String({
      minLength: 10,
      maxLength: 255,
      errorMessage: {
        type: "The type characteristic is format string",
        minLength: "The type must have a minimum length of 10",
        maxLength: "The type must have a maximum length of 255",
      },
    }),
    id_states: Type.Integer({
      minimum: 1,
      maximum: 1,
      errorMessage: {
        type: "The type id_states is format integer",
        minimum: "The type must have a minimum length of 1",
        maximum: "The type must have a maximum length of 1",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "This has to be a object",
      additionalProperties: "The format from object is not valid",
      required: {
        id_states: "The is_states is request",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormat(ajv, ["email"]);
addError(ajv);

const validate = ajv.compile(propertySchema);

/**
 * This middleware is responsible for verifying if the user inserted
 * the data in form correctly.
 * @param {Object} req
 * @param {String} res
 * @param {*} next
 * @returns Error message or access the next method.
 */

const propertyValidate = (req, res, next) => {
  const isObjectValidate = validate(req?.body);

  if (!isObjectValidate) {
    return res
      .status(404)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  }

  next();
};

export { propertyValidate };
