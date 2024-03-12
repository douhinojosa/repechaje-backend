import { Stat } from "./Stats";
import { AppDataSource } from "../../database/db";

const statRepository = AppDataSource.getRepository(Stat);

interface DataStat {
    id_user: number;
    kg: number;
    money: number;
    products: number;
}

const create = async (id_user: number) => {
    try {
        const stat = new Stat();
        stat.id_user = id_user;
        stat.kg_saved = 0;
        stat.m_saved = 0.0;
        stat.p_saved = 0;
        await statRepository.save(stat);
        return stat;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new Stat. ${err}`);
    }
}

const getStatById = async (id_user: number) => {
    try {
        return await statRepository.find({ where: {id_user: id_user} });
    } catch (err) {
        console.error(err);
        throw new Error(`Error findding Stat. ${err}`);
    }
}

const updateStatById = async (statData: DataStat) => {
    try {
        const stat = await statRepository.find({ where: { id_user: statData.id_user } });
        stat[0].kg_saved = statData.kg;
        stat[0].m_saved = statData.money;
        stat[0].p_saved = statData.products;
        await statRepository.save(stat[0]);
        return stat;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating Stat. ${err}`);
    }
}

export default { create, getStatById, updateStatById };