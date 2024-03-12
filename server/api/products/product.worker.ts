import { Product } from "./Product";
import { Business } from "../business/Business";
import { AppDataSource } from "../../database/db";
import { Like, Between } from "typeorm";
import { env } from "../../config/index";
import axios from "axios";

const { geocoding } = env;

const productRepository = AppDataSource.getRepository(Product);
const businessRepository = AppDataSource.getRepository(Business);

interface DataProduct {
    id_business: number;
    business_id: string;
    name: string;
    logo: string;
    description: string;
    stock: number;
    limit: Date;
    app_price: number;
    regular_price: number;
    type: string;
    kg: number;
}

interface ICoordinates {
    lat: string;
    lon: string;
}

const getAddressByCoordinates = async (lat: string, lon: string) => {
    return await axios.get(`${geocoding.api_geo}?lat=${lat}&lon=${lon}&api_key=${geocoding.api_key}`);
}

const createProduct = async (productData: DataProduct) => {
    try {
        const product = new Product();
        product.id_business = productData.id_business;
        product.business_id = productData.business_id;
        product.name = productData.name;
        product.description = productData.description;
        product.logo = productData.logo;
        product.stock = productData.stock;
        product.app_price = productData.app_price;
        product.limit = new Date(productData.limit);
        product.regular_price = productData.regular_price;
        product.type = productData.type;
        product.kg = productData.kg;
        await productRepository.save(product);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new product. ${err}`);
    }
}

const findById = async (id: number) => {
    try {
        const product = await productRepository.find({where : {id: id}})
        if (product.length === 0) throw {status: 401, message: `Product not found`};
        return product;
    } catch (err: any) {
        console.error(err);
        throw new Error(`Error to find a product. ${err.message}`);
    }
}                                                                                                                                                                                                                                                                                                                                   

const findBy = async (params: string) => {
    try {
        const products = await productRepository.find({ where: [{ name: Like(`%${params}%`)}, {description: Like(`%${params}%`) }] } );
        console.log(products);
        if (products.length === 0) throw {status: 401, message: `Product not found`};
        return products;
    } catch (err: any) {
        console.error(err);
        throw new Error(`Error to find a product. ${err.message}`);
    }
}

interface UpdateProduct {
    id: number;
    stock: number;
    limit: Date;
    app_price: number;
}

const updateProduct = async (productData: UpdateProduct) => {
    try {
        const product = await productRepository.find({where : {id: productData.id}})
        product[0].stock = productData.stock;
        product[0].limit = productData.limit;
        product[0].app_price = productData.app_price;
        await productRepository.save(product[0]);
        return product[0];
    } catch (err: any) {
        console.error(err);
        throw new Error(`Error to find a product. ${err.message}`);
    }
}

const searchOfferByCoordinates = async (coordinates: ICoordinates) => {
    try {
        const { lat, lon } = coordinates;
        const { county } = (await getAddressByCoordinates(lat, lon)).data?.address;
        const business = await businessRepository.find({ where: { county: county } });
        const offers: DataProduct[] = [];
        business.map(async b => {
           const products = await productRepository.find({ where: { id_business: b.id, app_price: Between(0.5, 3) } }) 
           products.map(product => offers.push(product));
        })
        return offers;
    } catch (err: any) {
        console.error(err);
        throw new Error(`Error to find a business. ${err}`);
    }
}

export default { createProduct, findById, findBy, updateProduct, searchOfferByCoordinates };