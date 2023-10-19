// fail of connections between environments and database
export const PORT_SERVER = process.env.PORT_SERVER || 3010;

const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || "name";
const DB_USER = process.env.DB_USER || "user";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || "";
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || "";
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || "";

export {
  DB_PORT,
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
