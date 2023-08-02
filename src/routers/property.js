import { Router } from "express";
import {
    createProperty,
    deleteProperty,
    getAllProperty,
    getIdProperty,
    updateProperty,
} from "../controllers/property.js";
//import { checkJwt } from "../middlewares/securityRole.js";
import { verifyAuth } from "../middlewares/authValidate.js";

const routerPro = Router();

routerPro.get("/all", verifyAuth, getAllProperty);

routerPro.get("/id", verifyAuth, getIdProperty);

routerPro.post("/create/id", verifyAuth, createProperty);

routerPro.patch("/update/id", verifyAuth, updateProperty);

routerPro.delete("/delete/id", verifyAuth, deleteProperty);

export { routerPro };
