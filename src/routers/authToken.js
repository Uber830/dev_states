import { Router } from "express";

import { authTokenlogin, registerUser } from "../controllers/authToken.js";
import { loginValidate } from "../DTO/loginValidate.js";
import { registerValidate } from "../DTO/registerValidate.js";
// import { verifyAuth } from "../middlewares/authValidate.js";
// TODO: This implement method veryfyAuth to register

const authTokenRouter = Router();

authTokenRouter.post("/login", loginValidate, authTokenlogin);

authTokenRouter.post("/register", registerValidate, registerUser);

export { authTokenRouter };
