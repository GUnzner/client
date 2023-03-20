import Ticket from "../models/Ticket.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const createTicket = async (req, res) => {
  const { category, title, urgency } = req.body;

  if (!category || !title || !urgency) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ ticket });
};

const deleteTicket = async (req, res) => {
  res.send("delete Ticket");
};

const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ tickets, totalTickets: tickets.length, numOfPages: 1 });
};

const updateTicket = async (req, res) => {
  res.send("update Ticket");
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createTicket, deleteTicket, getAllTickets, updateTicket, showStats };
