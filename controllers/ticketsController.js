import Ticket from "../models/Ticket.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/CheckPermissions.js";
//import mongoose from "mongoose";
import moment from "moment";

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
  const { id: ticketId } = req.params;

  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new NotFoundError(`No ticket with id: ${ticketId}`);
  }

  checkPermissions(req.user, ticket.createdBy);

  await ticket.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! ticket removed" });
};

const getAllTickets = async (req, res) => {
  const { status, category, sort, search } = req.query;
  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (category && category !== "all") {
    queryObject.category = category;
  }

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Ticket.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const tickets = await result;

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
  let stats = await Ticket.aggregate([
    //{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    assigned: stats.assigned || 0,
    solved: stats.solved || 0,
  };

  let monthlyTickets = await Ticket.aggregate([
    // { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyTickets = monthlyTickets
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyTickets });
};

export { createTicket, deleteTicket, getAllTickets, updateTicket, showStats };
