import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormat from "ajv-formats";
import addError from "ajv-errors";

const propertySchemaUpdate = Type.Object(
  {
    type: Type.Union([
      Type.String({
        minLength: 5,
        maxLength: 35,
        errorMessage: {
          type: "The type must be a string",
          minLength: "The type must have a minimum length of 5",
          maxLength: "The type must have a maximum length of 35",
        },
      }),
      Type.Null(),
    ]),
    address: Type.Union([
      Type.String({
        minLength: 5,
        maxLength: 80,
        errorMessage: {
          type: "The type must be a string",
          minLength: "The type must have a minimum length of 5",
          maxLength: "The type must have a maximum length of 30",
        },
      }),
      Type.Null(),
    ]),
    area: Type.Union([
      Type.Number({
        minimum: 1,
        maximum: 100,
        errorMessage: {
          type: "The type must be a Integer",
          minimum: "The type must have a minimum length of 1",
          maximum: "The type must have a maximum length of 100",
        },
      }),
      Type.Null(),
    ]),
    price: Type.Union([
      Type.Integer({
        minimum: 80000.0,
        maximum: 100000000.0,
        errorMessage: {
          type: "The type must be a Integer",
          minimum: "The type must have a minimum length of 80.000000",
          maximum: "The type must have a maximum length of 100.000000000",
        },
      }),
      Type.Null(),
    ]),
    characteristic: Type.Union([
      Type.String({
        minLength: 10,
        maxLength: 255,
        errorMessage: {
          type: "The type characteristic is format string",
          minLength: "The type must have a minimum length of 10",
          maxLength: "The type must have a maximum length of 255",
        },
      }),
      Type.Null(),
    ]),
    id_states: Type.Union([
      Type.Integer({
        minimum: 1,
        maximum: 3,
        errorMessage: {
          type: "The type id_states is format integer",
          minimum: "The type must have a minimum length of 1",
          maximum: "The type must have a maximum length of 3",
        },
      }),
      Type.Null(),
    ]),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "This has to be a object",
      additionalProperties: "The format from object is not valid",
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormat(ajv, ["email"]);
addError(ajv);

const validate = ajv.compile(propertySchemaUpdate);

/**
 * This middleware is responsible for verifying if the user inserted
 * the data in form correctly.
 * @param {Object} req
 * @param {String} res
 * @param {*} next
 * @returns Error message or access the next method.
 */

const propertyUpdateValidate = (req, res, next) => {
  // iterate the object
  for (let [key, value] of Object.entries(req?.body)) {
    let toNumber = ["area", "price", "id_states"];

    // check if exists the key in the array
    if (toNumber.includes(key)) {
      // transform the value to number
      req.body[key] = Number(value);
    }

    // check if the value is empty
    if (value === "") req.body[key] = null;
  }

  const isObjectValidate = validate(req?.body);

  if (!isObjectValidate) {
    return res
      .status(404)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  }

  next();
};

export { propertyUpdateValidate };
