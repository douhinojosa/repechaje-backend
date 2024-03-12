import { Favorite } from "./Favorites";
import { AppDataSource } from "../../database/db";

const favoriteRepository = AppDataSource.getRepository(Favorite);

interface DataFavorite {
    id_user: number;
    id_business: number;
}

const createFavorite = async (favoriteData: DataFavorite) => {
    try {
        const favorite = new Favorite();
        favorite.id_user = favoriteData.id_user;
        favorite.id_business = favoriteData.id_business;
        await favoriteRepository.save(favorite);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error(`Create favorite error. ${err}`);
    }
}

const noFavorite = async (id_user: number, id_business: number) => {
    try {
        const deleted = await favoriteRepository.find({where: {id_user: id_user, id_business: id_business}});
        await favoriteRepository.remove(deleted);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error(`No favorite error. ${err}`);
    }
}

const getFavorites = async (id_user: number) => {
    try {
       return await favoriteRepository.find({ where: {id_user: id_user} });
    } catch (err: any) {
        console.error(err);
        throw new Error(`Find favorite error`);
    }
}

export default {createFavorite, noFavorite, getFavorites}