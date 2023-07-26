import { Router } from "express";
import {
    createProperty,
    deleteProperty,
    getAllProperty,
    getIdProperty,
    updateProperty,
} from "../controllers/property.js";

const routerPro = Router();

routerPro.get("/all", getAllProperty);

routerPro.get("/id", getIdProperty);

routerPro.post("/create/id", createProperty);

routerPro.patch("/update/id", updateProperty);

routerPro.delete("/delete/id", deleteProperty);

export { routerPro };
