import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

