import { Router } from "express";

import { authTokenlogin, registerUser } from "../controllers/authToken.js";
import { loginValidate } from "../DTO/loginValidate.js";
import { registerValidate } from "../DTO/registerValidate.js";

const authTokenRouter = Router();

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Returns token for user.     
 */

/**
 * @swagger
 * tags:
 *  name: login
 *  description: login endpoint
 */

authTokenRouter.post("/login", loginValidate, authTokenlogin);

/**
 * @swagger
 * /register:
 *  post:
 *     summary: Create a user account.
 * 
 */

authTokenRouter.post("/register", registerValidate, registerUser);

export { authTokenRouter };
