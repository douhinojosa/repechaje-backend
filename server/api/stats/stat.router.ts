import { Router } from "express";
import statHandler from "./stat.handler";

const statRouter: Router = Router();

statRouter.route('/create').post(statHandler.createStat);
statRouter.route('/get/:id_user').get(statHandler.getStatById);
statRouter.route('/update').patch(statHandler.updateStatById);

export default statRouter;