import { Router } from "express";
import {getAllUsers,getIdUsers,createUsers,updateUsers,deleteUsers} from "../controllers/users.js";
import { verifyAuth } from "../middlewares/authValidate.js";
import { validateIdUser } from "../middlewares/validateIdUser.js";
import { userValidate } from "../DTO/userValidate.js";
import { userValidateCreatings } from "../DTO/userValidateCreatings.js";
import { authRole } from "../middlewares/authRole.js";
import { validateUploadFiles } from "../middlewares/validateUploadFiles.js";

import fileUpload from "express-fileupload";

const userRouter = Router();

/**
 * This component is responsible for loading the results of a user
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      properties:
 *        id: 
 *          type: integer
 *          description: ID of the user
 *        cc: 
 *          type: integer
 *          description: Cc of the user
 *        firtsname: 
 *          type: string
 *          description: Name of the user
 *        lastname: 
 *          type: string
 *          description: lastname of the user
 *        image_profile:
 *          type: string
 *          description: image profile of the user
 *        email: 
 *          type: string   
 *          description: Email of the user
 *        id_role: 
 *          type: integer
 *          description: id role of the user
 *        date_created:
 *          type: string
 *          description: date created of the user
 *        date_updated:
 *          type: string
 *          description: date updated of the user
 *      required:
 *        - firtsname 
 *        - email
 *        - id_role
 *      examples:
 *        cc: null
 *        firtsname: uberman
 *        lastname: null
 *        image_profile: null
 *        email: example@ejemplo.com
 *        id_role: 2
 *        date_create: 2023-08-08T04:25:54.000Z
 *        date_update: 2023-08-08T04:25:54.000Z
 */

// FIXME: acomodar ideas para poder tratar images, que el cliente nos envie 
// si desde el get o update, las dos y tambien el 'id_role'.
/**
 * @swagger
 * components:
 *   schemas:
 *    userCreate:
 *      type: object
 *      properties:
 *        cc: 
 *          type: string
 *          description: Cc of the user
 *        firtsname: 
 *          type: string
 *          description: Name of the user
 *        lastname: 
 *          type: string
 *          description: lastname of the user
 *        image_profile:
 *          type: number
 *          description: image profile of the user
 *        email: 
 *          type: string   
 *          description: Email of the user to update
 *        password: 
 *          type: string   
 *          description: Password of the user to update
 *        id_role:
 *          type: integer
 *          description: This is the role for the user
 *      required:
 *         - firtsname 
 *         - email
 *         - password
 *      examples:
 *         cc: null
 *         firtsname: name
 *         lastname: null
 *         image_profile: null
 *         email: example@ejemplo.com
 *         password: password123
 */

/**
 * This component is responsible for creating of a new user
 * @swagger
 * components:
 *  schemas:
 *    userRequests:
 *      type: object
 *      properties:
 *        firtsname: 
 *          type: string
 *          description: Name of the user
 *        email: 
 *          type: string   
 *          description: Email of the user
 *        id_role: 
 *          type: integer
 *          description: id role of the user
 *      required:
 *        - firtsname 
 *        - email
 *        - id_role
 *      examples:
 *        firtsname: uberman
 *        email: example@ejemplo.com
 *        id_role: 2
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users endpoint 
 */

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/user"
 */

userRouter.get("/all", verifyAuth, authRole(["admin"]), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns one user if it exists
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id  
 *         required: true  
 *         schema:
 *           type: integer
 *           minimun: 1
 *           description: The ID of the user
 *     responses:
 *       200:
 *         description: Returns one user
 *         content:
 *           application/json:
 *             schema:
 *               type: array 
 *               items:
 *                 $ref: "#/components/schemas/user"
 *       500:
 *         description: some server error   
 */

userRouter.get("/:id", verifyAuth, getIdUsers);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userCreate'
 *     responses:
 *       201:
 *         description: 
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: { result: "user created successfully" }
 *       500:
 *         description: some server error
 */

userRouter.post("/create", verifyAuth, authRole(["admin"]), userValidateCreatings, createUsers);
// FIXME: agregar image_profile en la documentacion de swagger
/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: Id of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/userCreate'        
 *     responses:
 *       200:
 *         description: Returns message of updated with existing 
 *         content:
 *           text/plain:
 *             schema:
 *              type: string
 *              example: {result: 'user update successfully'}
 *       500:
 *         description:  some server error
 */

userRouter.patch("/update/:id",verifyAuth, userValidate, validateIdUser, fileUpload({
  useTempFiles: true,tempFileDir: "./uploads",}), validateUploadFiles, updateUsers);

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: delete a user for the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: ID of the user to delete
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       500: 
 *         description: some server error
 */

userRouter.delete("/delete/:id", verifyAuth, authRole(["admin"]), validateIdUser, deleteUsers);

export { userRouter };
