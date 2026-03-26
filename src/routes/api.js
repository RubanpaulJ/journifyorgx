import { Router } from "express";

import { authRouter } from "./auth.js";
import { publicRouter } from "./public.js";
import { adminRouter } from "./admin.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => res.json({ ok: true }));
apiRouter.use("/auth", authRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/admin", adminRouter);

