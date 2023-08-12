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
      optionsRoleBest.forEach((role) => {
        const isBoolean = optionsRole.includes(role);

        if (!isBoolean) {
          throw new Error(`This role ${role} not have permissions`);
        }

        if (optionsRoleBest.length !== 1) {
          if (role) {
            console.log(`Access to ${role} is not allowed`);
          }
        }

        if (role !== roldb) {
          throw new Error(`This role ${role} not have permissions`);
        }
      });

      next();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

export { authRole };
