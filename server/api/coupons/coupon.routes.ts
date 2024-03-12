import { Router } from "express";
import couponHandler from "./coupon.handler";

const couponRouter = Router();

couponRouter.route('/create').post(couponHandler.create);
couponRouter.route('/set/:id_coupon/:limit').get(couponHandler.setCouponsUsers);
couponRouter.route('/').get(couponHandler.getCoupons);
couponRouter.route('/get/coupons/:id_user').get(couponHandler.getCouponsByUser);
couponRouter.route('/get/users/:id_coupon').get(couponHandler.getUsersByCoupons);

export default couponRouter;