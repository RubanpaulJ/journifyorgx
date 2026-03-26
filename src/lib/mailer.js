import nodemailer from "nodemailer";
import { env } from "./env.js";

export function getMailer() {
  const enabled = Boolean(env.MAIL_HOST && env.MAIL_USER && env.MAIL_PASS && env.MAIL_TO);
  if (!enabled) return { enabled: false };

  const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT || 587,
    secure: env.MAIL_SECURE ?? false,
    auth: { user: env.MAIL_USER, pass: env.MAIL_PASS }
  });

  return { enabled: true, transporter };
}

export async function sendEnquiryEmail({ subject, html }) {
  const mailer = getMailer();
  if (!mailer.enabled) return { sent: false };

  await mailer.transporter.sendMail({
    from: env.MAIL_FROM || env.MAIL_USER,
    to: env.MAIL_TO,
    subject,
    html
  });

  return { sent: true };
}

