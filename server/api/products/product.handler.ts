import { Request, Response } from "express";
import productWorker from "./product.worker";

const create = async (req: Request, res: Response) => {
    try {
        const product = productWorker.createProduct(req.body);
        res.status(201).json({status: 'OK', msg: 'Product Created Sucessfully', product})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productWorker.findById(Number(id));
        res.status(200).json({status: 'OK', product})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const findBy = async (req: Request, res: Response) => {
    try {
        const { params } = req.params;
        console.log(params);
        const product = await productWorker.findBy(params);
        res.status(200).json({status: 'OK', product})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const searchOffersByCoordinates = async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.params;
        const offers = await productWorker.searchOfferByCoordinates({lat, lon});
        res.status(200).json({status: 'OK', offers});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

export default {create, findById, findBy, searchOffersByCoordinates};