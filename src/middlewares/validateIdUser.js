import { poll } from "../../database/dbmysql.js";

/**
 * Verifies that the user not exists in the database,
 * if exists access the endpoint or return a message of error.
 *
 * @param {Object} req All data from the user and browser session
 * @param {String} res
 * @param {*} next
 * @returns Error message or access the next method.
 */

const validateIdUser = async (req, res, next) => {
  const { id } = req?.params;

  const [data] = await poll.query(
    "SELECT ISNULL(id) as resultado FROM users WHERE id = (?)",
    id
  );

  try {
    // Queremos que el usuario exista
    if (data.length < 1 || data[0]?.resultado === 1) {
      throw new Error("User not exists in database");
    }

    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

export { validateIdUser };
