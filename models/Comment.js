import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    ticketId: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },

  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
