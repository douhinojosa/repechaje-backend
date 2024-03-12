import { Request, Response } from "express";
import authWorker from "./auth.worker";

type Error = {
    status: number;
    message: string;
}

const login = async (req: Request, res: Response) => {
    try {
        const user = await authWorker.login(req.body);
        res.status(200).json({status: 'OK', user});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }    
};

const signup = async (req: Request, res: Response) => {
    try {
        console.log(`aqui body`);
        console.log(req.body);
        const user = await authWorker.registerUser(req.body);
        res.status(201).json({status: 'OK', msg: 'User Created Sucessfully', user});
    } catch (err: any) {
        console.error(err);
        res.status(500).json({Error: err})
    }
};

export default { login, signup };