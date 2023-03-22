import Ticket from "../models/Ticket.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/CheckPermissions.js";

const createTicket = async (req, res) => {
  const { category, title, urgency } = req.body;

  if (!category || !title || !urgency) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ ticket });
};

/*const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;

  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No ticket with id: ${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  await ticket.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! ticket removed" });
};*/

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;

  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No ticket with id :${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  await ticket.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Ticket removed" });
};

const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ tickets, totalTickets: tickets.length, numOfPages: 1 });
};

const updateTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { category, title, urgency } = req.body;

  if (!category || !title || !urgency) {
    throw new BadRequestError("Please provide all values");
  }
  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No ticket with id: ${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: ticketId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedTicket });
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createTicket, deleteTicket, getAllTickets, updateTicket, showStats };
