import { poll } from "../../database/dbmysql.js";
import { hashPassword } from "../helpers/verifypassword.js";

// Search all users in the database
const getAllUsers = async (req, res) => {
  try {
    const [data] = await poll.query("SELECT * FROM users");

    if (data.length <= 0)
      return res.status(404).send("Not found the search in users");

    return res.status(200).json({ users: data });
  } catch (erro) {
    return res.status(404).json({ message: [] });
  }
};

// Search user by id
const getIdUsers = async (req, res) => {
  const { id } = req?.params;

  try {
    const [data] = await poll.query(
      "SELECT * FROM users WHERE id = (?)",
      Number(id)
    );

    if (Boolean(data.length) != true)
      return res.status(404).send("Not contend users");

    return res.status(200).json({ users: data });
  } catch (err) {
    return res.status(404).json({ message: [] });
  }
};

// Create a new user
const createUsers = async (req, res) => {
  const { email, password } = req?.body;

  if (!email || !password) return res.sendStatus(404);

  try {
    const hash = await hashPassword(password); // generate hash

    const [rows] = await poll.query(
      "INSERT INTO users (email,password) VALUES (?, ?)",
      [email, hash]
    );

    if (rows.affectedRows != 1) {
      throw new Error("Error while trying to create new user");
    }

    return res.status(201).json({ result: "user created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// FIXME:Generate DTO for this endpoint
// Update user profile
const updateUsers = async (req, res) => {
  const { id } = req?.params;
  const { cc, firtsname, lastname, email, password } = req?.body;

  const hash = await hashPassword(password); // generate hash

  try {
    const [rows] = await poll.query(
      `UPDATE users SET cc = IFNULL(?,cc), firtsname = IFNULL(?,firtsname), lastname = IFNULL(?,lastname), 
      email = IFNULL(?,email), password = IFNULL(?,password) WHERE id = (?)`,
      [cc, firtsname, lastname, email, hash, id]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Error while trying to update the user");
    }

    res.status(202).json({ result: "user update successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete user in database
const deleteUsers = async (req, res) => {
  const { id } = req?.params;

  try {
    const [rows] = await poll.query("DELETE FROM users WHERE id = (?)", id);

    if (rows?.affectedRows !== 1) {
      throw new Error("User not deleted, exist warnings");
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

export { createUsers, deleteUsers, getAllUsers, getIdUsers, updateUsers };
