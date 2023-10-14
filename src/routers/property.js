import { Router } from "express";
import {createProperty,deleteProperty,getAllProperty,getIdProperty,updateProperty} from "../controllers/property.js";
import { verifyAuth } from "../middlewares/authValidate.js";
import { propertyValidate } from "../DTO/propertyValidate.js";
import { authRole } from "../middlewares/authRole.js";
import { validateUploadFiles } from "../middlewares/validateUploadFiles.js";
//import { validateIdUser } from "../middlewares/validateIdUser.js";

import fileUpload from "express-fileupload";
import { propertyUpdateValidate } from "../middlewares/validatePropertyUpdate.js";

const routerPro = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    responseProperty:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: This Id for the user
 *       type:
 *         type: string
 *         description: type of property
 *       image_property:
 *         type: string
 *         description: Image the property for business
 *       address:
 *         type: string
 *         description: address of the property
 *       area:
 *         type: string
 *         description: area of the property m2
 *       price:
 *         type: string
 *         description: price of the property in dollars
 *       characteristic:
 *         type: string
 *         description: one or all characteristic of the property
 *       id_states:
 *         type: integer
 *         description: id states of the property
 *       date_create:
 *         type: string
 *         description: date create of the property in the application
 *       date_update:
 *         type: string 
 *         description: date update of the property in the application
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   propertyResponse:
 *    type: object
 *    properties:
 *     type:
 *       type: string
 *       description: Type of the property to post
 *     address:
 *       type: string
 *       description: Address of the property
 *     area:
 *       type: integer
 *       description: length of the property in square kilometers
 *     price:
 *       type: integer
 *       description: price of the property in dollars
 *     characteristic:
 *       type: string
 *       description: description all characteristic of property
 *     id_states:
 *       type: integer
 *       description: Id states of property
 *     image_property:
 *       type: string
 *       description: Image the property for business
 *  example:
 *   type: Cabaña
 *   address: Villa marcela carrera 56 #43-10 Funza - Cundinamarca
 *   area: 48
 *   price: 82500
 *   characteristic: El piso esta en perfecto estado,depósito, alacena,garaje para un auto.
 *   id_states: 1
 */

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property endpoint
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/property/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Gets all properties of to user
 *    tags: [Properties]
 *    responses:
 *      200:
 *       description: Array of properties
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *              $ref: '#components/schemas/responseProperty'
 *      404:
 *        description: some server error
 */

routerPro.get("/all", verifyAuth, getAllProperty);

/**
 * @swagger
 * /api/property/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Properties]
 *     summary: Get one property for id
 *     parameters:    
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *            minimum: 1
 *            description: The id of the property
 *     responses:
 *       200:
 *         description: object with array of one property
 *         content:
 *           application/json: 
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/responseProperties'      
 *       500:
 *        description: some server error
 */

routerPro.get("/:id", verifyAuth, getIdProperty);

/**
 * @swagger
 * /api/property/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Get one property for id
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/propertyResponse'
 *     responses:
 *       201:
 *        description: object with array of one property
 *        content:
 *         text/plain:
 *          schema:
 *           type: string
 *           example: { property: "Created property successfully" }
 *       404:
 *        description: some server error
 */

routerPro.post("/create", verifyAuth, authRole(["vendor"]), fileUpload({
    useTempFiles: true,tempFileDir: "./uploads",}), propertyValidate, validateUploadFiles, createProperty);

/**
 * @swagger
 * /api/property/update/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: Get one properties for id
 *     tags: [Properties]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *          description: Id of the properties to update
 *     requestBody:
 *       required: true
 *       content:      
 *         application/json:
 *           schema:
 *            $ref: '#components/schemas/propertyResponse'
 *     responses:
 *       201:
 *         description: object with array of one properties
 *         content:
 *           text/plain:
 *            schema:
 *              type: string
 *              example: { property: "Update property successfully" }
 *       500:
 *         description: some server error
 */

routerPro.patch("/update/:id", verifyAuth, authRole(["vendor"]), fileUpload({
    useTempFiles: true,tempFileDir: "./uploads",}), propertyUpdateValidate, validateUploadFiles, updateProperty);

/**
 * @swagger
 * /api/property/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Get one properties for id
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: Id of the properties to delete
 *     responses:
 *       204:
 *         description: Property successfully deleted
 *       500:
 *         description: some server error
 */

routerPro.delete("/delete/:id", verifyAuth, authRole(["admin","vendor"]), deleteProperty);

export { routerPro };
