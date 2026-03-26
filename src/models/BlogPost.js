import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPublic: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

