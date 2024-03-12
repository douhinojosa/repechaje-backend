import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";

const app: Application = express();

//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//HEALTH
app.get('/', (req: Request, res: Response) => res.status(200).json({msg: `Hello World`}));

//ROUTES
app.use(router);

export default app;