import { Request, Response } from "express";
import statWorker from "./stat.worker";

const createStat = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params;
        const stat = await statWorker.create(Number(id_user));
        res.status(201).json({status: 'OK', msg: 'Stat Created Sucessfully', stat});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const getStatById = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params;
        const stat = await statWorker.getStatById(Number(id_user));
        res.status(201).json({status: 'OK', msg: 'Stat finded', stat});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const updateStatById = async (req: Request, res: Response) => {
    try {
        const stat = await statWorker.updateStatById(req.body);
        res.status(201).json({status: 'OK', msg: 'Stat updated', stat});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

export default { createStat, getStatById, updateStatById };