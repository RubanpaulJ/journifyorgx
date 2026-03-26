import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priceFromInr: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

