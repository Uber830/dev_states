import { poll } from "../../database/dbmysql.js";
import { comparePassword } from "./verifypassword.js";

// validate meil and password
const authByEmailPwd = async (email, password) => {
  try {
    const [data] = await poll.query(
      "SELECT id,password FROM users WHERE email = (?)",
      email
    );

    if (data.length <= 0) return new Error("Invalid validate");

    const hash = data?.[0]?.password;

    const response = await comparePassword(password, hash);

    if (response === false) {
      throw new Error("Failed to compare password");
    } else {
      return { id: data?.[0]?.id };
    }
  } catch (error) {
    throw new Error(`Not found error message: ${error.message}`);
  }
};

export { authByEmailPwd };
