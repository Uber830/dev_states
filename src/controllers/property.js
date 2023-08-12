import { poll } from "../../database/dbmysql.js";

// get all properties
const getAllProperty = async (req, res) => {
  try {
    const [data] = await poll.query("SELECT * FROM property ORDER BY type");

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

  // create DTO for the property, validate values
  try {
    const [rows] = await poll.query(
      "INSERT INTO property(type, address, area, price, characteristic, id_states) VALUES(?,?,?,?,?,?)",
      [type, address, area, price, characteristic, id_states]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Invalid values for property");
    }

    res.status(201).json({ property: "Created property successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// update a property
const updateProperty = async (req, res) => {
  const { id } = req?.params;
  const { type, address, area, price, characteristic, id_states } = req?.body;
  
  try {
    const [rows] = await poll.query(
      `UPDATE property SET type = IFNULL(?,type), address = IFNULL(?,address), area = IFNULL(?,area), price = IFNULL(?,price),characteristic = IFNULL(?,characteristic), id_states = IFNULL(?,id_states) WHERE id = (?)`,
      [type, address, area, price, characteristic, id_states, id]
    );

    if (rows.affectedRows !== 1) {
      throw new Error("Invalid query parameters for update");
    }

    res.status(201).json({ property: "Update property successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.menssage });
  }
};

// delete a property
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await poll.query("DELETE FROM property WHERE id = (?)", id);

    if (rows.affectedRows < 1) {
      throw new Error("Property not exists");
    }

    res.sendStatus(204);
  } catch (err) {
    return res.status(err.statusCode()).json({ error: err.menssage });
  }
};

export {
  createProperty,
  deleteProperty,
  getAllProperty,
  getIdProperty,
  updateProperty,
};
