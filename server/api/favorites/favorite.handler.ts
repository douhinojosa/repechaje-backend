import { Request, Response } from "express";
import favoriteWorker from "./favorite.worker";

const create = async (req: Request, res: Response) => {
    try {
        const favorite = favoriteWorker.createFavorite(req.body);
        res.status(201).json({status: 'OK', msg: 'Favorite Created Sucessfully', favorite})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const noFavorite = async (req: Request, res: Response) => {
    try {
        const { id_user, id_business } = req.params;
        const favorite = favoriteWorker.noFavorite(Number(id_user), Number(id_business));
        res.status(201).json({status: 'OK', msg: 'No more favorite', favorite})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const getFavorites = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params;
        const favorites = favoriteWorker.getFavorites(Number(id_user));
        res.status(201).json({status: 'OK', favorites})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

export default { create, noFavorite, getFavorites };