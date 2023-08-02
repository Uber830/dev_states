import { SignJWT } from "jose";
import { poll } from "../../database/dbmysql.js";
import { authByEmailPwd } from "../helpers/authByEmailPwd.js";
import { hashPassword } from "../helpers/verifypassword.js";

// login
const authTokenlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { id } = await authByEmailPwd(email, password);
    if(!id) return res.sendStatus(400);

    // generate tokend
    const jwtConstructor = new SignJWT({ id });

    const encoder = new TextEncoder(); // transform secret key
    const jwt = await jwtConstructor // generate jwt
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (err) {
    return res.status(401).send("Invalid login credentials");
  }
};

// TODO: implement middleware validation for users created
// Register
const registerUser = async (req, res) => {
  const { firtsname, password, email } = req.body;

  if (!firtsname || !password || !email) return res.sendStatus(404);

  try {
    const [data] = await poll.query(
      "SELECT IF(email IS NULL ,0 ,1) FROM users WHERE email = (?)",
      email
    );

    if (data === 1) return res.status(200).send("Users exists");
  } catch (err) {
    res.status(400).send(err.message);
  }

  try {
    // generate hash unique
    const hash = await hashPassword(password);

    const [rows] = await poll.query(
      "INSERT INTO users (firtsname,email,password) VALUES (?,?,?)",
      [firtsname, email, hash]
    );

    if (rows?.affectedRows != 1) return res.sendStatus(404);
    return res.status(201).send("Created");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

export { authTokenlogin, registerUser };
