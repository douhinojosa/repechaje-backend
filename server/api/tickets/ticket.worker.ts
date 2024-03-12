import { Ticket, T_Pay, Status } from "./Ticket";
import { Ticket_Product } from "./tickets_products/Ticket_Product";
import { Product } from "../products/Product";
import { AppDataSource } from "../../database/db";

const ticketRepository = AppDataSource.getRepository(Ticket);
const ticket_productRepository = AppDataSource.getRepository(Ticket_Product);
const productRepository = AppDataSource.getRepository(Product);

interface DataTicket {
    id_user: number;
    id_business: number;
    app_fee: number;
    total_ticket: number;
    total_product: number;
    t_pay: T_Pay;
    status: Status;
}

interface DataTicketProduct {
    id_product: number;
    total_products: number;

}

const createTicket = async (ticketData: DataTicket) => {
    try {
        const ticket = new Ticket();
        ticket.id_user = ticketData.id_user;
        ticket.id_business = ticketData.id_business;
        ticket.app_fee = ticketData.app_fee;
        ticket.total_ticket = ticketData.total_ticket;
        ticket.total_products = ticketData.total_product;
        ticket.t_pay = ticketData.t_pay;
        ticket.status = ticketData.status;
        await ticketRepository.save(ticket);
        return ticket;
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new ticket. ${err}`);
    }
}

const createTicketProduct = async (id_ticket: number, ticketProductsData: DataTicketProduct[]) => {
    try {
        ticketProductsData.map(async (product: DataTicketProduct) => {
            const ticket_product = new Ticket_Product();
            ticket_product.id_ticket = id_ticket;
            ticket_product.id_product = product.id_product;
            ticket_product.total_products = product.total_products;
            await ticket_productRepository.save(ticket_product);
        })
    } catch (err) {
        console.error(err);
        throw new Error(`Error to register a new ticket_product. ${err}`);
    }
}

const getTicket = async (id_ticket: number) => {
    try {
        const ticket = await ticketRepository.find({ where: {id: id_ticket} });
        if (ticket.length === 0) throw {status: 401, message: `Ticket not found`};
        const products = await ticket_productRepository.find({ where: { id_ticket: id_ticket } });
        if (products.length === 0) throw {status: 401, message: `Products not found`};
        return [ticket, products];
    } catch (err) {
        console.error(err);
        throw new Error(`Error finded a ticket. ${err}`);
    }
}

const cancelledTicket = async (id_ticket: number) => {
    try {
        const products = await ticket_productRepository.find({ where: { id_ticket: id_ticket } }); //TODO
        const ticket = new Ticket();
        ticket.status = 'cancelled';
        await ticketRepository.save(ticket);
        return ticket;
    } catch (err) {
        console.error(err);
        throw new Error(`Error cancelling a ticket. ${err}`);
    }
}

const resolvedTicket = async (id_ticket: number) => {
    try {
        const ticket = new Ticket();
        ticket.status = 'resolved';
        await ticketRepository.save(ticket);
        return ticket;
    } catch (err) {
        console.error(err);
        throw new Error(`Error resolving a ticket. ${err}`);
    }
}

export default { createTicket, createTicketProduct, getTicket, cancelledTicket, resolvedTicket }

