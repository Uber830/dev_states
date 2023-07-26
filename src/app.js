import cors from 'cors';
import Express from "express";
import morgan from 'morgan';

import { routerPro } from "./routers/property.js";

const app = Express();


//middleware
app.use(Express.json());
app.use(cors('*'));
app.use(morgan('dev'));

//router
app.use('/', routerPro);

export default app;