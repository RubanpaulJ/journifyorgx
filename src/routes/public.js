import { Router } from "express";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

import { env } from "../lib/env.js";
import { Service } from "../models/Service.js";
import { Project } from "../models/Project.js";
import { Testimonial } from "../models/Testimonial.js";
import { Enquiry } from "../models/Enquiry.js";
import { Order } from "../models/Order.js";
import { BlogPost } from "../models/BlogPost.js";
import { sendEnquiryEmail } from "../lib/mailer.js";
import { nanoid } from "nanoid";

export const publicRouter = Router();

publicRouter.get("/config", (_req, res) => {
  res.json({
    ok: true,
    config: {
      appName: env.PUBLIC_APP_NAME,
      whatsappNumber: env.PUBLIC_WHATSAPP_NUMBER
    }
  });
});

publicRouter.get("/services", async (_req, res) => {
  const services = await Service.find({ isActive: true }).sort({ createdAt: 1 }).lean();
  res.json({ ok: true, services });
});

publicRouter.get("/projects", async (_req, res) => {
  const projects = await Project.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
  res.json({ ok: true, projects });
});

publicRouter.get("/testimonials", async (_req, res) => {
  const testimonials = await Testimonial.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
  res.json({ ok: true, testimonials });
});

publicRouter.get("/blog", async (_req, res) => {
  const posts = await BlogPost.find({ isPublic: true })
    .sort({ publishedAt: -1 })
    .select("slug title excerpt tags publishedAt")
    .lean();
  res.json({ ok: true, posts });
});

publicRouter.get("/blog/:slug", async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, isPublic: true }).lean();
  if (!post) return res.status(404).json({ ok: false, error: { message: "Post not found" } });
  res.json({ ok: true, post });
});

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const uploadDirAbs = path.resolve(process.cwd(), env.UPLOAD_DIR);
ensureDir(uploadDirAbs);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirAbs),
  filename: (_req, file, cb) => {
    const safeExt = path.extname(file.originalname).slice(0, 10);
    cb(null, `${Date.now()}-${nanoid(10)}${safeExt}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: env.MAX_UPLOAD_MB * 1024 * 1024 }
});

publicRouter.post("/enquiries", upload.array("files", 3), async (req, res) => {
  const body = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(8),
      projectTopic: z.string().min(3),
      message: z.string().optional()
    })
    .parse(req.body);

  const attachments = (req.files || []).map((f) => `/${env.UPLOAD_DIR}/${f.filename}`);
  const enquiry = await Enquiry.create({ ...body, message: body.message || "", attachments });

  await sendEnquiryEmail({
    subject: `New enquiry: ${body.projectTopic}`,
    html: `
      <h2>New enquiry</h2>
      <p><b>Name:</b> ${body.name}</p>
      <p><b>Email:</b> ${body.email}</p>
      <p><b>Phone:</b> ${body.phone}</p>
      <p><b>Topic:</b> ${body.projectTopic}</p>
      <p><b>Message:</b> ${body.message || "-"}</p>
      <p><b>Attachments:</b> ${attachments.length ? attachments.join("<br/>") : "-"}</p>
    `
  });

  res.json({ ok: true, enquiry: { id: enquiry._id.toString() } });
});

publicRouter.get("/orders/track/:code", async (req, res) => {
  const order = await Order.findOne({ trackingCode: req.params.code }).lean();
  if (!order) return res.status(404).json({ ok: false, error: { message: "Not found" } });
  res.json({
    ok: true,
    order: {
      trackingCode: order.trackingCode,
      status: order.status,
      package: order.package,
      topic: order.topic,
      timelineNotes: order.timelineNotes,
      updatedAt: order.updatedAt
    }
  });
});

