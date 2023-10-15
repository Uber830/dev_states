const optionsRole = ["admin", "vendor", "client"];

/**
 * This middleware is responsible of validating the role user
 * and only accepting ['admin', 'vendor','client']. This returns a boolean value.
 */

const authRole =
  (optionsRoleBest = [undefined]) =>
  (req, res, next) => {
    const { roldb } = req?.dataUsuario;

    try {
      // check if the role is allowed
      const isAllowed = optionsRoleBest.some((role) =>
        optionsRole.includes(role)
      );

      // the role is equal to the roledb
      const isBoolean = optionsRoleBest.filter((role) => role === roldb);

      if (isAllowed && isBoolean) {
        next();
      } else {
        throw new Error(`One or more roles do not have permissions.`);
      }
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

export { authRole };
