import Comment from "../models/Comment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/CheckPermissions.js";
import moment from "moment";
import mongoose from "mongoose";

const createComment = async (req, res) => {
  const { text, userId, ticketId, parentId } = req.body;

  if (!text) {
    throw new BadRequestError("Please enter text");
  }
  req.body.createdBy = req.user.userId;
  const comment = await Comment.create(req.body);
  res.status(StatusCodes.CREATED).json({ comment });
};

const getComments = async (req, res) => {
  const { ticket } = req.query;

  if (!mongoose.Types.ObjectId.isValid(ticket))
    return res.status(404).json({ msg: `No ticket with id :${ticket}` });

  const comment = await Comment.find({ ticketId: ticket });

  if (!comment) {
    throw new NotFoundError(`No Comment with id: ${ticket}`);
  }

  res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: `No comment with id :${id}` });

  const comment = await Comment.findOne({ _id: id });

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${id}`);
  }

  checkPermissions(req.user, comment.userId);

  await comment.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Comment removed" });
};

// const updateComment = async (req, res) => {
//   const { id: commentId } = req.params;
//   const { text, userId, parentId } = req.body;

//   if (!text) {
//     throw new BadRequestError("Please enter text");
//   }
//   const comment = await Comment.findOne({ _id: commentId });

//   if (!comment) {
//     throw new NotFoundError(`No comment with id: ${commentId}`);
//   }

//   checkPermissions(req.user, comment.createdBy);

//   const updatedComment = await Comment.findOneAndUpdate(
//     { _id: commentId },
//     req.body,
//     { new: true, runValidators: true }
//   );
//   res.status(StatusCodes.OK).json({ updatedComment });
// };

//export { createComment, deleteComment, getComments, updateComment };
export { createComment, getComments, deleteComment };
