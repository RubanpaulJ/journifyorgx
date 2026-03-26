import express from "express";
import path from "path";
import { env } from "../lib/env.js";

export function serveUploads() {
  const uploadDirAbs = path.resolve(process.cwd(), env.UPLOAD_DIR);
  return express.static(uploadDirAbs, { fallthrough: true });
}

