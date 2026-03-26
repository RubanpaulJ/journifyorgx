import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { connectDb } from "./lib/db.js";
import { env } from "./lib/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { serveUploads } from "./middleware/staticUploads.js";
import { apiRouter } from "./routes/api.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(`/${env.UPLOAD_DIR}`, serveUploads());

app.get("/health", (_req, res) => res.json({ ok: true, name: env.PUBLIC_APP_NAME }));
app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

await connectDb();

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${env.PORT}`);
});

