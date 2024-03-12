import { Router } from "express";
import authRouter from "./api/users/auth/auth.routes";
import businessRouter from "./api/business/business.router";
import productRouter from "./api/products/product.router";
import favoriteRouter from "./api/favorites/favorite.router";
import couponRouter from "./api/coupons/coupon.routes";
import ticketRouter from "./api/tickets/ticket.routes";
import statRouter from "./api/stats/stat.router";
import { authMid } from "./middlewares/auth.middleware";


const router: Router = Router();

router.use('/auth', authRouter);
router.use('/business', businessRouter);
router.use('/products', productRouter);
router.use('/favorites', favoriteRouter);
router.use('/coupons', couponRouter);
router.use('/ticket', ticketRouter);
router.use('/stats', statRouter);

/* router.get('/piggys', authMid, (req, res) => {
    res.status(200).json({msg: 'Piggys'});
}) */

export default router;