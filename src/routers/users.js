import { Router } from "express";
import {
  getAllUsers,
  getIdUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from "../controllers/users.js";
//import { checkJwt } from "../middlewares/securityRole.js";
import { verifyAuth } from "../middlewares/authValidate.js";
import { validateIdUser } from "../middlewares/validateIdUser.js";

const userRouter = Router();
// TODO: crear middlewares para validar si existe los usuarios
userRouter.get("/all", verifyAuth, getAllUsers);

userRouter.get("/:id", verifyAuth, getIdUsers);

userRouter.post("/create", verifyAuth, createUsers);

userRouter.patch("/update/:id", verifyAuth, validateIdUser, updateUsers);

userRouter.delete("/delete/:id", verifyAuth, validateIdUser, deleteUsers);

export { userRouter };
