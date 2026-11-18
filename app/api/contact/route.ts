import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Strip CR/LF from anything that ends up in a mail header.
  const name = clean(body?.name, MAX_NAME)?.replace(/[\r\n]+/g, " ");
  const email = clean(body?.email, MAX_EMAIL);
  const message = clean(body?.message, MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[contact] GMAIL_USER or GMAIL_APP_PASSWORD is not set");
    return NextResponse.json({ error: "Contact form is unavailable." }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: { name, address: user },
      to: "samielimam@gmail.com",
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    // Logged so failures show up in the Vercel function logs instead of
    // surfacing only as an opaque 500.
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ error: "Message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
