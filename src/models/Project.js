import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    techStack: { type: [String], default: [] },
    abstract: { type: String, required: true, trim: true },
    screenshots: { type: [String], default: [] }, // URLs or local paths
    isPublic: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

