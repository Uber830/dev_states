import { poll } from "../../database/dbmysql.js";
import fs from "fs-extra";
import { hashPassword } from "../helpers/verifypassword.js";
import { uploadImage, deleteImage } from "../helpers/cloudinary.js";

// Search all users in the database
const getAllUsers = async (req, res) => {
  try {
    const [data] = await poll.query(
      "SELECT id,cc,firtsname,lastname,image_profile,email,id_role,date_create,date_update FROM users"
    ); // not returning a password

    if (data.length <= 0)
      return res.status(404).send("Not found the search in users");

    res.status(200).send(data);
  } catch (erro) {
    res.status(404).json({ message: [] });
  }
};

// Search user by id
const getIdUsers = async (req, res) => {
  const { id } = req?.params;

  try {
    const [data] = await poll.query(
      "SELECT cc,firtsname,lastname,image_profile,email,id_role,date_create,date_update FROM users WHERE id = (?) AND state = 'activo'",
      Number(id)
    );

    if (Boolean(data.length) != true) {
      throw new Error("Not contend users");
    }

    res.status(200).send(data);
  } catch (err) {
    res.status(404).json({ message: [] });
  }
};

// Create a new user
const createUsers = async (req, res) => {
  const { firtsname, email, password, id_role } = req?.body;

  try {
    const hash = await hashPassword(password); // generate hash

    const [rows] = await poll.query(
      "INSERT INTO users (firtsname,email,password,id_role) VALUES (?,?,?,?)",
      [firtsname, email, hash, id_role]
    );

    if (rows.affectedRows != 1) {
      throw new Error("Error while trying to create new user");
    }

    res.status(201).json({ result: "user created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user profile
const updateUsers = async (req, res) => {
  const { id } = req?.params;
  const { cc, firtsname, lastname, email, password } = req?.body;

  // upload image in cloudinary
  const cloudImage = await uploadImage(req?.files?.image_profile?.tempFilePath);
  const { public_id, url } = cloudImage;

  const hash = await hashPassword(password); // generate hash

  try {
    const [rows] = await poll.query(
      `UPDATE users SET cc = IFNULL(?,cc), firtsname = IFNULL(?,firtsname), lastname = IFNULL(?,lastname), 
      id_image = IFNULL(?,id_image), image_profile = IFNULL(?,image_profile) ,email = IFNULL(?,email), 
      password = IFNULL(?,password) WHERE id = (?)`,
      [cc, firtsname, lastname, public_id, url, email, hash, id]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Error while trying to update the user");
    }

    // delete image in folder local 'uploads'
    await fs.unlink(req?.files?.image_profile?.tempFilePath);

    res.status(202).json({ result: "user update successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user in database
const deleteUsers = async (req, res) => {
  const { id } = req?.params;
  try {
    // search id_image in database
    const [data] = await poll.query(
      "SELECT id_image FROM users WHERE id = (?)",
      id
    );

    // validate if the user has an image
    const id_image = data?.[0]?.id_image;

    if (typeof id_image !== "object") {
      // delete image in cloudinary
      await deleteImage(id_image);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }

  try {
    // delete user in database by id
    const [rows] = await poll.query("DELETE FROM users WHERE id = (?)", id);

    // validate if the user was deleted
    if (rows?.affectedRows !== 1) {
      throw new Error(`Error while trying to delete the user with id ${id}`);
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { createUsers, deleteUsers, getAllUsers, getIdUsers, updateUsers };
