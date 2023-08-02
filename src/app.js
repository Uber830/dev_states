import cors from "cors";
import Express from "express";
import morgan from "morgan";

import { authTokenRouter } from "./routers/authToken.js";
import { routerPro } from "./routers/property.js";
import { userRouter } from "./routers/users.js";

const app = Express();

//middleware
app.use(Express.json());
app.use(cors("*"));
app.use(morgan("dev"));

//router
app.use("/", authTokenRouter);
app.use("/api", userRouter);
//app.use("/api", routerPro);

export default app;