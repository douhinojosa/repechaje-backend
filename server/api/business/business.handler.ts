import { Request, Response } from "express";
import businessWorker from "./business.worker";

const create = async (req: Request, res: Response) => {
    try {
        const business = businessWorker.createBusiness(req.body);
        res.status(201).json({status: 'OK', msg: 'Business Created Sucessfully', business})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const business = await businessWorker.findById(Number(id));
        res.status(200).json({status: 'OK', business})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const searchBusinessByCoordinates = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const { lat, lon } = req.params;
        const business = await businessWorker.searchBusinessByCoordinates({lat, lon});
        res.status(200).json({status: 'OK', business});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

export default { create, findById, searchBusinessByCoordinates };
