import { Router } from "express";
import ticketHandler from "./ticket.handler";

const ticketRouter: Router = Router();

ticketRouter.route('/create').post(ticketHandler.create);
ticketRouter.route('/get/:id_ticket').get(ticketHandler.getTicket);

export default ticketRouter;