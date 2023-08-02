import { poll } from "../../database/dbmysql.js";

// get all properties
const getAllProperty = async (req, res) => {
  try {
    const [data] = await poll.query("SELECT * FROM users ");

    if (data.length <= 0) return res.sendStatus(404);

    res.send(200).json({ usuarios: data });
  } catch (err) {
    return res.status(404).json({ err: err.menssage });
  }
};

// get a property
const getIdProperty = () => {};

// create a new property
const createProperty = () => {};

// update a property
const updateProperty = () => {};

// delete a property
const deleteProperty = () => {};

export {
  createProperty,
  deleteProperty,
  getAllProperty,
  getIdProperty,
  updateProperty,
};
