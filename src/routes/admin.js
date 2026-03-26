import { Router } from "express";
import { z } from "zod";

import { requireAuth, requireAdmin } from "../middleware/requireAuth.js";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { Enquiry } from "../models/Enquiry.js";
import { Order } from "../models/Order.js";
import { BlogPost } from "../models/BlogPost.js";
import { Service } from "../models/Service.js";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/me", async (req, res) => {
  res.json({ ok: true, admin: req.user });
});

adminRouter.get("/users", async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("-passwordHash").lean();
  res.json({ ok: true, users });
});

adminRouter.get("/enquiries", async (_req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
  res.json({ ok: true, enquiries });
});

adminRouter.patch("/enquiries/:id", async (req, res) => {
  const body = z
    .object({
      status: z.enum(["new", "in_progress", "resolved"]).optional(),
      adminNotes: z.string().optional()
    })
    .parse(req.body);
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, body, { new: true }).lean();
  if (!enquiry) return res.status(404).json({ ok: false, error: { message: "Not found" } });
  res.json({ ok: true, enquiry });
});

adminRouter.get("/orders", async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  res.json({ ok: true, orders });
});

adminRouter.post("/orders", async (req, res) => {
  const body = z
    .object({
      trackingCode: z.string().min(6),
      customerName: z.string().min(2),
      customerEmail: z.string().email(),
      customerPhone: z.string().min(8),
      package: z.enum(["basic", "standard", "premium"]),
      topic: z.string().min(3),
      amountInr: z.number().min(0)
    })
    .parse(req.body);

  const order = await Order.create(body);
  res.json({ ok: true, order });
});

adminRouter.patch("/orders/:id", async (req, res) => {
  const body = z
    .object({
      status: z.enum(["received", "consultation", "in_progress", "review", "completed"]).optional(),
      timelineNotes: z.array(z.string()).optional()
    })
    .parse(req.body);
  const order = await Order.findByIdAndUpdate(req.params.id, body, { new: true }).lean();
  if (!order) return res.status(404).json({ ok: false, error: { message: "Not found" } });
  res.json({ ok: true, order });
});

adminRouter.get("/projects", async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  res.json({ ok: true, projects });
});

adminRouter.post("/projects", async (req, res) => {
  const body = z
    .object({
      title: z.string().min(2),
      slug: z.string().min(2),
      techStack: z.array(z.string()).optional(),
      abstract: z.string().min(10),
      screenshots: z.array(z.string()).optional(),
      isPublic: z.boolean().optional()
    })
    .parse(req.body);
  const project = await Project.create({
    ...body,
    techStack: body.techStack || [],
    screenshots: body.screenshots || [],
    isPublic: body.isPublic ?? true
  });
  res.json({ ok: true, project });
});

adminRouter.patch("/projects/:id", async (req, res) => {
  const body = z
    .object({
      title: z.string().min(2).optional(),
      techStack: z.array(z.string()).optional(),
      abstract: z.string().min(10).optional(),
      screenshots: z.array(z.string()).optional(),
      isPublic: z.boolean().optional()
    })
    .parse(req.body);
  const project = await Project.findByIdAndUpdate(req.params.id, body, { new: true }).lean();
  if (!project) return res.status(404).json({ ok: false, error: { message: "Not found" } });
  res.json({ ok: true, project });
});

adminRouter.get("/services", async (_req, res) => {
  const services = await Service.find().sort({ createdAt: 1 }).lean();
  res.json({ ok: true, services });
});

adminRouter.post("/services", async (req, res) => {
  const body = z
    .object({
      slug: z.string().min(2),
      title: z.string().min(2),
      description: z.string().min(10),
      priceFromInr: z.number().min(0),
      isActive: z.boolean().optional()
    })
    .parse(req.body);
  const service = await Service.create({ ...body, isActive: body.isActive ?? true });
  res.json({ ok: true, service });
});

adminRouter.patch("/services/:id", async (req, res) => {
  const body = z
    .object({
      title: z.string().min(2).optional(),
      description: z.string().min(10).optional(),
      priceFromInr: z.number().min(0).optional(),
      isActive: z.boolean().optional()
    })
    .parse(req.body);
  const service = await Service.findByIdAndUpdate(req.params.id, body, { new: true }).lean();
  if (!service) return res.status(404).json({ ok: false, error: { message: "Not found" } });
  res.json({ ok: true, service });
});

adminRouter.get("/blog", async (_req, res) => {
  const posts = await BlogPost.find().sort({ publishedAt: -1 }).lean();
  res.json({ ok: true, posts });
});

adminRouter.post("/blog", async (req, res) => {
  const body = z
    .object({
      slug: z.string().min(2),
      title: z.string().min(2),
      excerpt: z.string().min(10),
      content: z.string().min(50),
      tags: z.array(z.string()).optional(),
      isPublic: z.boolean().optional(),
      publishedAt: z.string().datetime().optional()
    })
    .parse(req.body);
  const post = await BlogPost.create({
    ...body,
    tags: body.tags || [],
    isPublic: body.isPublic ?? true,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date()
  });
  res.json({ ok: true, post });
});

