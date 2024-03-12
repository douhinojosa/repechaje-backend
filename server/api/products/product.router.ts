import { Router } from "express";
import productHandler from "./product.handler";

const productRouter: Router = Router();

productRouter.route('/create').post(productHandler.create);
productRouter.route('/find/:id').get(productHandler.findById);
productRouter.route('/findBy/:params').get(productHandler.findBy);
productRouter.route('/search/:lat/:lon').get(productHandler.searchOffersByCoordinates);

export default productRouter;