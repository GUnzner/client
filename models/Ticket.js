import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please provide category"],
      enum: ["new employee", "IT issues"],
    },
    urgency: {
      type: String,
      required: [true, "Please provide urgency"],
      enum: ["low", "high", "critical"],
    },
    title: {
      type: String,
      required: [true, "Please state what issue needs fixing"],
    },
    text: {
      type: String,
      default: "Error description",
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "solved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);
