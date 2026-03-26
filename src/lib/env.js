import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(8080),

  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),

  PUBLIC_APP_NAME: z.string().default("PaperPro Solutions"),
  PUBLIC_WHATSAPP_NUMBER: z.string().default("919999999999"),

  MAIL_HOST: z.string().optional().or(z.literal("")),
  MAIL_PORT: z.coerce.number().optional(),
  MAIL_SECURE: z.coerce.boolean().optional(),
  MAIL_USER: z.string().optional().or(z.literal("")),
  MAIL_PASS: z.string().optional().or(z.literal("")),
  MAIL_FROM: z.string().optional().or(z.literal("")),
  MAIL_TO: z.string().optional().or(z.literal("")),

  ADMIN_SEED_EMAIL: z.string().email(),
  ADMIN_SEED_PASSWORD: z.string().min(8),

  UPLOAD_DIR: z.string().default("uploads"),
  MAX_UPLOAD_MB: z.coerce.number().default(15)
});

export const env = envSchema.parse(process.env);

