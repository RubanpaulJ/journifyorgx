import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { User } from "../models/User.js";
import { signJwt } from "../lib/jwt.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const body = z
    .object({ email: z.string().email(), password: z.string().min(1) })
    .parse(req.body);

  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });
  }

  const ok = await bcrypt.compare(body.password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });
  }

  const token = signJwt({ sub: user._id.toString(), role: user.role, email: user.email });
  res.json({
    ok: true,
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
  });
});

