import { poll } from "../../database/dbmysql.js";

/**
 * validamos si el usuario existe en nuestra base de datos dependiendo de ello
 * se responde con un mensaje o dandole acceso a siguiente metodo en ejecución.
 *
 * @param {*} req Datos obtenidos del usuario o del middleware anterior
 * @param {*} res Valores a enviar al controlador
 * @param {*} next Siguiente
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
