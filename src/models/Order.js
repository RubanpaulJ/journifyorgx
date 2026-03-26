import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    trackingCode: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    customerPhone: { type: String, required: true, trim: true },
    package: { type: String, enum: ["basic", "standard", "premium"], required: true },
    topic: { type: String, required: true, trim: true },
    amountInr: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["received", "consultation", "in_progress", "review", "completed"],
      default: "received"
    },
    timelineNotes: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

