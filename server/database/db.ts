import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "../config/index";
import { User } from "../api/users/User";
import { Business } from "../api/business/Business";
import { Product } from "../api/products/Product";
import { Ticket } from "../api/tickets/Ticket";
import { Coupon } from "../api/coupons/Coupon";
import { Favorite } from "../api/favorites/Favorites";
import { Coupon_User } from "../api/coupons/coupons_users/Coupon_User";
import { Ticket_Product } from "../api/tickets/tickets_products/Ticket_Product";
import { Stat } from "../api/stats/Stats";

const database = env.database;

const options: DataSourceOptions = {
    type: 'mysql',
    host: database.host,
    username: database.db_user,
    password: database.db_pass,
    database: database.db,
    entities: [User, Business, Product, Ticket, Coupon, Favorite, Coupon_User, Ticket_Product, Stat],
    synchronize: true,
    dropSchema: false
};

export const AppDataSource: DataSource = new DataSource(options);

export const db_init = async (dataSource: DataSource) => {
    try {
        await dataSource.initialize();
        console.log(`Database connection was successfully.`);
    } catch (err) {
        console.error(`Unable to connect to database. ERROR: ${err}`);
    }
};