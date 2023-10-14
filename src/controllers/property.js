import { poll } from "../../database/dbmysql.js";
import { uploadImage, deleteImage } from "../helpers/cloudinary.js";
import fs from "fs-extra";
import { deleteImageCloud } from "../helpers/deleteImageCloud.js";

// get all properties
const getAllProperty = async (req, res) => {
  try {
    const [data] = await poll.query("SELECT * FROM property ORDER BY id");

    if (data.length < 1) {
      throw new Error(`Property is empty ${res.status(404)}`);
    }

    res.status(200).json({ property: data });
  } catch (err) {
    return res.status(404).json({ err: err.menssage });
  }
};

// get a property
const getIdProperty = async (req, res) => {
  const { id } = req?.params;

  try {
    const [data] = await poll.query(
      "SELECT * FROM property WHERE id = (?)",
      id
    );

    if (data.length < 1) {
      throw new Error("Property is empty");
    }

    res.status(200).json({ property: data });
  } catch (err) {
    return res.status(500).json({ error: err.menssage });
  }
};

// create a new property
const createProperty = async (req, res) => {
  const { type, address, area, price, characteristic, id_states } = req?.body;

  // upload image to cloudinary
  const cloudImage = await uploadImage(req?.files?.image_url?.tempFilePath);
  const { public_id, url } = cloudImage;

  try {
    const [rows] = await poll.query(
      `INSERT INTO property(type,id_image,image_url,address,area,price,characteristic,id_states) 
      VALUES(?,?,?,?,?,?,?,?)`,
      [type, public_id, url, address, area, price, characteristic, id_states]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Invalid values for property");
    }

    // delete image in folder local 'uploads'
    await fs.unlink(req?.files?.image_url?.tempFilePath);

    res.status(201).json({ property: "Created property successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// update a property
const updateProperty = async (req, res) => {
  const { id } = req?.params;
  const { type, address, area, price, characteristic, id_states } = req?.body;

  // upload image to cloudinary
  const cloudImage = await uploadImage(req?.files?.image_url.tempFilePath);
  const { public_id, url } = cloudImage;

  try {
    const [rows] = await poll.query(
      `UPDATE property SET type = IFNULL(?,type), id_image = IFNULL(?, id_image), image_url = IFNULL(?, image_url), 
      address = IFNULL(?,address), area = IFNULL(?,area), price = IFNULL(?,price),
      characteristic = IFNULL(?,characteristic), id_states = IFNULL(?,id_states) WHERE id = (?)`,
      [type, public_id, url, address, area, price, characteristic, id_states, id]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Invalid query parameters for update");
    }

    // delete image in folder local 'uploads'
    await fs.unlink(req?.files?.image_url?.tempFilePath);

    res.status(201).json({ property: "Update property successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.menssage });
  }
};

// delete a property
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    // search id_image in database
    const [data] = await poll.query(
      "SELECT id_image FROM property WHERE id = (?)",
      id
    );

    // shearch id_image in db and delete in cloudinary
    await deleteImageCloud(data);

    const [rows] = await poll.query("DELETE FROM property WHERE id = (?)", id);

    if (rows.affectedRows < 1) {
      throw new Error("Property not exists");
    }

    res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.menssage });
  }
};

export {
  createProperty,
  deleteProperty,
  getAllProperty,
  getIdProperty,
  updateProperty,
};
