import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    projectTopic: { type: String, required: true, trim: true },
    message: { type: String, default: "", trim: true },
    attachments: { type: [String], default: [] },
    status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new" },
    adminNotes: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

