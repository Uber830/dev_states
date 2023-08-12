import { Router } from "express";
import {getAllUsers,getIdUsers,createUsers,updateUsers,deleteUsers} from "../controllers/users.js";
import { verifyAuth } from "../middlewares/authValidate.js";
import { validateIdUser } from "../middlewares/validateIdUser.js";
import { userValidate } from "../DTO/userValidate.js";
import { authRole } from "../middlewares/authRole.js";

const userRouter = Router();

/**
 * @swagger
 * Users:
 *  name: Users
 *  description: Users endpoints
 */

userRouter.get("/all", verifyAuth, authRole(["admin"]), getAllUsers);

userRouter.get("/:id", verifyAuth, getIdUsers);

userRouter.post("/create", verifyAuth, authRole(["admin"]), userValidate, createUsers);

userRouter.patch("/update/:id",verifyAuth, userValidate, validateIdUser, updateUsers);

userRouter.delete("/delete/:id", verifyAuth, authRole(["admin"]), validateIdUser, deleteUsers);

export { userRouter };
