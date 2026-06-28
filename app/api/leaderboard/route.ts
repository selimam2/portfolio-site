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
    const [name, date] = member.split("|");
    entries.push({ name, score, date });
  }

  return NextResponse.json(entries);
}

const MAX_SCORE = 60; // 1 answer/sec for 60s is already superhuman

export async function POST(req: NextRequest) {
  const { name, score } = await req.json();

  if (!name || typeof score !== "number" || score < 0 || score > MAX_SCORE) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const member = `${name.trim()}|${new Date().toLocaleDateString("en-CA")}`;
  await redis.zadd(KEY, { score, member });

  // Keep only top 100 entries
  await redis.zremrangebyrank(KEY, 0, -101);

  return NextResponse.json({ success: true });
}
