import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = "mathblitz:leaderboard";

export async function GET() {
  let results: string[];
  try {
    results = await redis.zrange<string[]>(KEY, 0, 9, {
      rev: true,
      withScores: true,
    });
  } catch (err) {
    console.error("[leaderboard] read failed:", err);
    return NextResponse.json({ error: "Leaderboard unavailable." }, { status: 503 });
  }

  const entries = [];
  for (let i = 0; i < results.length; i += 2) {
    const member = results[i] as string;
    const score = Number(results[i + 1]);
    // Support both legacy "name|date" members and current "name" members
    const [name] = member.split("|");
    entries.push({ name, score });
  }

  return NextResponse.json(entries);
}

const MAX_SCORE = 60;
const MAX_NAME = 20;

export async function POST(req: NextRequest) {
  let body: { name?: unknown; score?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  const { name, score } = body;

  if (
    typeof name !== "string" ||
    !Number.isInteger(score) ||
    (score as number) < 0 ||
    (score as number) > MAX_SCORE
  ) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  // Matches the input's maxLength; "|" is reserved by the legacy member format.
  const member = name.trim().replace(/\|/g, "").slice(0, MAX_NAME);
  if (!member) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    // Only write if this is a new personal best for this name
    const existing = await redis.zscore(KEY, member);
    if (existing !== null && Number(existing) >= (score as number)) {
      return NextResponse.json({ success: true, updated: false });
    }

    await redis.zadd(KEY, { score: score as number, member });
    await redis.zremrangebyrank(KEY, 0, -101);
  } catch (err) {
    console.error("[leaderboard] write failed:", err);
    return NextResponse.json({ error: "Leaderboard unavailable." }, { status: 503 });
  }

  return NextResponse.json({ success: true, updated: true });
}
