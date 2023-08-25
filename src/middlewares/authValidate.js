import { jwtVerify } from "jose";

/**
 * This is a helper function where we check if the user has authenticated
 * @param {string} Authorization header having authorization information of the user
 */

const verifyAuth = async (req, res, next) => {
  const { authorization } = req?.headers;

  try {
    if (authorization === "undefined")
      return new Error(`Invalid authorization header`);

    // validate the length of the authorization
    const authorizationLength = (authorization = String) => {
      if (authorization.length !== 159) {
        return (authorization = authorization.split(" ").at(-1)); // access token of authorization
      }
      return authorization;
    };

    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorizationLength(authorization),
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    req.dataUsuario = payload;

    return next();
  } catch (erro) {
    res.status(401).json({ error: "Invalid authorization header" });
  }
};

export { verifyAuth };
