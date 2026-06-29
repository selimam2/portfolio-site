import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = "mathblitz:leaderboard";

export async function GET() {
  const results = await redis.zrange<string[]>(KEY, 0, 9, {
    rev: true,
    withScores: true,
  });

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

export async function POST(req: NextRequest) {
  const { name, score } = await req.json();

  if (!name || typeof score !== "number" || score < 0 || score > MAX_SCORE) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const member = name.trim();

  // Only write if this is a new personal best for this name
  const existing = await redis.zscore(KEY, member);
  if (existing !== null && Number(existing) >= score) {
    return NextResponse.json({ success: true, updated: false });
  }

  await redis.zadd(KEY, { score, member });
  await redis.zremrangebyrank(KEY, 0, -101);

  return NextResponse.json({ success: true, updated: true });
}
