import bcrypt from "bcrypt";

/**
 * Genera un hash con el password en text plano, que le pasemos.
 * @param {String} plaintextPassword
 * @returns Password transformado en hash.
 */
const hashPassword = async (plaintextPassword = undefined) => {
  if (!plaintextPassword) return null;

  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
};

/**
 * Validar un password en text plano contra un hash.
 * @param {String} plaintextPassword Password en text plano del usuario.
 * @param {String} hash Recuperado de la base de datos.
 * @returns Boolean dependiendo de los datos.
 */

const comparePassword = async (plaintextPassword, hash) => {
  const verify = await bcrypt.compare(plaintextPassword, hash);
  return verify;
};

export { hashPassword, comparePassword };
