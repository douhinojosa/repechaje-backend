import { Router } from "express";
import authHandler from "./auth.handler";

const authRouter: Router = Router();

authRouter.route('/login').post(authHandler.login);
authRouter.route('/signup').post(authHandler.signup);

export default authRouter;