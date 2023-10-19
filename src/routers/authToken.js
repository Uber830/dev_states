import { Router } from "express";

import { authTokenlogin, registerUser } from "../controllers/authToken.js";
import { loginValidate } from "../DTO/loginValidate.js";
import { registerValidate } from "../DTO/registerValidate.js";

const authTokenRouter = Router();

/**
 * This component generate descriptions for router login and to example
 * @swagger
 * components:
 *   schemas:
 *     loginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: the email address of the user with what is registered
 *         password:
 *           type: string
 *           description: the password of the user with what is registered
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: admin@ejemplo.com
 *         password: password123
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   register:
 *    type: object
 *    properties:
 *     firtsname:
 *       type: string
 *       description: the firtsname to register
 *     email:
 *       type: string
 *       description: the email address to register
 *     password:
 *       type: string
 *       description: the password to register
 *     id_role:
 *       type: integer
 *       description: the id role to register
 *    required:
 *      - firtsname
 *      - email
 *      - password
 *      - id_role
 *    example:
 *      firtsname: juan
 *      email: juan@ejemplo.com
 *      password: example123
 *      id_role: 3
 */

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: login endpoint
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Returns token for user.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/loginRequest'   
 *     responses:
 *       200:
 *         description: Returns token for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: Token del usuario registrado en la base de datos
 *       401:
 *         description: Invalid credentials for this user
 */

authTokenRouter.post("/login", loginValidate, authTokenlogin);

/**
 * @swagger
 * /register:
 *  post:
 *   summary: Create a user account.
 *   tags: [Login]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/register'
 *   responses:
 *     201:
 *       description:
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "Created successfully"
 *     500:
 *      description: some server error
 */

authTokenRouter.post("/register", registerValidate, registerUser);

export { authTokenRouter };
