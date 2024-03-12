import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/index";

const { jwt_env } = env;

export const authMid = (req: Request, res: Response, next: NextFunction) => {
    const bearer: string | undefined = req.get("Authorization");

    if (!bearer) res.status(401).json({status: 'Unauthorized'});

    const token: string | undefined = bearer?.split(' ')[1];
    
    jwt.verify(token || '', jwt_env.secret || '' , (err, user) => {
        if (err) {
            res.status(403).json({status: 'Forbidden'});
        } else {
            next();
        } 
    });

}