import nodemailer from "nodemailer";
import env from "./env";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  secure: Boolean(env.SECURE),
  connectionTimeout: 10000,
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
});

export default transporter;