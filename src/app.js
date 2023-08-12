import cors from "cors";
import Express from "express";
import morgan from "morgan";

// Swagger packages
import swaggerUi from "swagger-ui-express";
import swaggerJsDocs from "swagger-jsdoc";

import { authTokenRouter } from "./routers/authToken.js";
import { routerPro } from "./routers/property.js";
import { userRouter } from "./routers/users.js";
import { options } from "./swaggerOpcion.js";

const app = Express();

//middleware
app.use(Express.json());
app.use(cors());
app.use(morgan("dev"));

//swagger
const specs = swaggerJsDocs(options);

//router
app.use("/", authTokenRouter);
app.use("/api/users", userRouter);
app.use("/api/property", routerPro);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
