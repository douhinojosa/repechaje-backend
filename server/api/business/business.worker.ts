import { Business } from "./Business";
import { AppDataSource } from "../../database/db";
import { env } from "../../config/index";
import axios from "axios";

const businessRepository = AppDataSource.getRepository(Business);

const { geocoding } = env;

interface DataBusiness {
    id_user: number;
    name: string;
    rif: string;
    description: string;
    type: string;
    logo: string;
    lat: string;
    lon: string;
}

interface ICoordinates {
    lat: string;
    lon: string;
}

const getAddressByCoordinates = async (lat: string, lon: string) => {
    return await axios.get(`${geocoding.api_geo}?lat=${lat}&lon=${lon}&api_key=${geocoding.api_key}`);
}

const createBusiness = async (businessData: DataBusiness) => {
    try {
        const business = new Business();
        business.id_user = businessData.id_user;
        business.name = businessData.name;
        business.description = businessData.description;
        business.rif = businessData.rif;
        business.type = businessData.type;
        business.lat = businessData.lat;
        business.lon = businessData.lon;
        business.logo = businessData.logo;
        const location = (await getAddressByCoordinates(businessData.lat, businessData.lon)).data.address;
        business.suburb = location.suburb;
        business.county = location.county;
        await businessRepository.save(business);
        return business;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new business. ${err}`);
    }
}

const findById = async (id: number) => {
    try {
        const business = await businessRepository.find({where : {id: id}})
        if (business.length === 0) throw {status: 401, message: `Business not found`};
        return business;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to find a business. ${err}`);
    }
}

const searchBusinessByCoordinates = async (coordinates: ICoordinates) => {
    try {
        const { lat, lon } = coordinates;
        const { county } = (await getAddressByCoordinates(lat, lon)).data?.address;
        const business = await businessRepository.find({ where: {county: county} });
        return business;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to find a business. ${err}`);
    }
}

export default { createBusiness, searchBusinessByCoordinates, findById };
