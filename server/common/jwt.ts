import jwt from "jsonwebtoken";
import { env } from "../config/index";

const { jwt_env } = env;

const secret = jwt_env.secret || 'asdsafsdfsfds';

interface UserPayload {
    email: string;
    username: string;
}

 export const sign = (payload: UserPayload) => jwt.sign(payload, secret/* , { expiresIn: jwt_env.expiresIn } */);     

 /* export const verify = (token: string, secret: string) => jwt.verify(token, secret, (err: any, user) => {
    if (!err) 
 }); */ 