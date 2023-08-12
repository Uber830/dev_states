import { Router } from "express";
import {createProperty,deleteProperty,getAllProperty,getIdProperty,updateProperty} from "../controllers/property.js";
import { verifyAuth } from "../middlewares/authValidate.js";
import { propertyValidate } from "../DTO/propertyValidate.js";
import { authRole } from "../middlewares/authRole.js";

const routerPro = Router();

routerPro.get("/all", verifyAuth, getAllProperty);

routerPro.get("/:id", verifyAuth, getIdProperty);

routerPro.post("/create", verifyAuth, authRole(["vendor"]), propertyValidate, createProperty);

routerPro.patch("/update/:id", verifyAuth, authRole(["vendor"]), propertyValidate, updateProperty);

routerPro.delete("/delete/:id", verifyAuth, authRole(["admin","vendor"]),deleteProperty);

export { routerPro };
