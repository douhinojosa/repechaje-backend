import { Coupon } from "./Coupon";
import { Coupon_User } from "./coupons_users/Coupon_User";
import { Stat } from "../stats/Stats";
import { AppDataSource } from "../../database/db";

const couponRepository = AppDataSource.getRepository(Coupon);
const couponUserRepository  = AppDataSource.getRepository(Coupon_User);
const statRepository = AppDataSource.getRepository(Stat);


interface DataCoupon {
    saldo: number;
    time: Date;
}

const createCoupon = async (couponData: DataCoupon) => {
    try {
        const coupon = new Coupon();
        coupon.saldo = couponData.saldo;
        coupon.time = new Date(coupon.time);
        await couponRepository.save(coupon);
        return coupon;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new coupon. ${err}`);
    }
}

const getCoupons = async () => {
    try {
        await couponRepository.find();
    } catch (err) {
        console.error(err);
        throw new Error(`Error getting coupons. ${err}`);
    }
}

const setCouponUser = async (id_user: number, id_coupon: number) => {
    try {
        const coupon_user = new Coupon_User();
        coupon_user.id_user = id_user;
        coupon_user.id_coupon = id_coupon;
        await couponRepository.save(coupon_user);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to set a coupon to user. ${err}`);
    }
}

const getCouponsByUser = async (id_user: number) => {
    try {   
        await couponUserRepository.find({ where: {id_user: id_user} });
    } catch (err) {
        console.error(err);
        throw new Error(`Error to get a coupons by user. ${err}`);
    }
}

const getUsersByCoupon = async (id_coupon: number) => {
    try {
        await couponUserRepository.find({ where: {id_coupon: id_coupon} });
    } catch (err) {
        console.error(err);
        throw new Error(`Error to get a users by coupons. ${err}`);
    }
}

const setCouponsUsersByParam = async (limit: number, id_coupon: number) => {
    try {
        const users = await statRepository.find({ order: {kg_saved: 'desc'}, take: limit });
        users.map(async user => {
            await setCouponUser(user.id_user, id_coupon);
        })
        return true;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to set coupons. ${err}`);
    }
}



export default { createCoupon, setCouponUser, getCoupons, getCouponsByUser, getUsersByCoupon, setCouponsUsersByParam }