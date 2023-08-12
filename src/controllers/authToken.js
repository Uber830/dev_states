import { SignJWT } from "jose";
import { poll } from "../../database/dbmysql.js";
import { authByEmailPwd } from "../helpers/authByEmailPwd.js";
import { hashPassword } from "../helpers/verifypassword.js";

// login
const authTokenlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { id, rol } = await authByEmailPwd(email, password);

    if (!id || !rol) {
      throw new Error("Invalid email or password value");
    }

    const [data] = await poll.query(
      `SELECT role FROM users INNER JOIN roles ON users.id_role = roles.id
      WHERE users.id = (?) AND users.id_role = (?)`,
      [id, rol]
    );

    if (data.length < 0) {
      throw new Error("Error access to the role");
    }
    const roldb = data[0]?.role;

    // generate tokend
    const jwtConstructor = new SignJWT({ id, roldb });

    // send with jwt the role
    const encoder = new TextEncoder(); // transform secret key
    const jwt = await jwtConstructor // generate jwt
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })

      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    const [rows] = await poll.query(
      "INSERT INTO login (id_user) VALUES (?)",
      id
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Invalid registered of user");
    }

    res.send({ jwt });
  } catch (err) {
    res.status(401).send(`Invalid login credentials ${err}`);
  }
};

// Register
const registerUser = async (req, res) => {
  const { firtsname, password, email, id_role } = req.body;

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
      "INSERT INTO users (firtsname,email,password,id_role) VALUES (?,?,?,?)",
      [firtsname, email, hash, id_role]
    );

    if (rows?.affectedRows != 1) return res.sendStatus(404);
    res.status(201).send("Created");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

export { authTokenlogin, registerUser };
