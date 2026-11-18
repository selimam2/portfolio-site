import type { Metadata } from "next";
import MathGame from "../components/MathGame";

const TITLE = "Math Blitz ⚡ — samielimam.com";
const DESCRIPTION =
  "A 60-second mental math game with a shared leaderboard. Questions get harder as your score climbs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/game" },
  openGraph: {
    type: "website",
    url: "/game",
    siteName: "Sami El-Imam",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GamePage() {
  return <MathGame />;
}
