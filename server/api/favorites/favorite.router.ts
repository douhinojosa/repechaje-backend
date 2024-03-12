import { Router } from "express";
import favoriteHandler from "./favorite.handler";

const favoriteRouter: Router = Router();

favoriteRouter.route('/create').post(favoriteHandler.create);
favoriteRouter.route('/noFavorite/:id_user/:id_business').get(favoriteHandler.noFavorite);
favoriteRouter.route('/getFavorites/:id_user').get(favoriteHandler.getFavorites);

export default favoriteRouter;