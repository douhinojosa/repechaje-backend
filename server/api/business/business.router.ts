import { Router } from "express";
import businessHandler from "./business.handler";

const businessRouter: Router = Router();

businessRouter.route('/create').post(businessHandler.create);
businessRouter.route('/find/:id').get(businessHandler.findById);
businessRouter.route('/search/:lat/:lon').get(businessHandler.searchBusinessByCoordinates);

export default businessRouter;