import { Request, Response } from "express";
import ticketWorker from "./ticket.worker";

const create = async (req: Request, res: Response) => {
    try {
        const { ticketData, productsData } = req.body;
        const ticket = await ticketWorker.createTicket(ticketData);
        const products = await ticketWorker.createTicketProduct(ticket.id, productsData);
        res.status(201).json({status: 'OK', msg: 'Ticket Created Sucessfully', ticket});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

const getTicket = async (req: Request, res: Response) => {
    try {
        const { id_ticket } = req.params;
        const ticket = await ticketWorker.getTicket(Number(id_ticket));
        res.status(200).json({status: 'OK', ticket});
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({status: 'FAILED', error: err?.message || err})
    }
}

export default { create, getTicket };

