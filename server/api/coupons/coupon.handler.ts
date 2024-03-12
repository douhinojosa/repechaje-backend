import { Request, Response } from "express";
import couponWorker from "./coupon.worker";

const create = async (req: Request, res: Response) => {
    try {
        const coupon = await couponWorker.createCoupon(req.body);
        res.status(201).json({status: 'OK', msg: 'Coupon Created Sucessfully', coupon});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const setCouponsUsers = async (req: Request, res: Response) => {
    try {
        const {limit, id_coupon} = req.params
        await couponWorker.setCouponsUsersByParam(Number(limit), Number(id_coupon));
        res.status(201).json({status: 'OK', msg: 'Coupon setted to users sucessfully'})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const getCoupons = async (req: Request, res: Response) => {
    try {
        const coupons = await couponWorker.getCoupons()
        res.status(200).json({status: 'OK', coupons})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const getCouponsByUser = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params;
        const coupons = await couponWorker.getCouponsByUser(Number(id_user));
        res.status(200).json({status: 'OK', coupons})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})   
    }
}

const getUsersByCoupons = async (req: Request, res: Response) => {
    try {
        const { id_coupon } = req.params;
        const coupons = await couponWorker.getUsersByCoupon(Number(id_coupon));
        res.status(200).json({status: 'OK', coupons})
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})   
    }
}

export default { create, setCouponsUsers, getCoupons, getCouponsByUser, getUsersByCoupons };