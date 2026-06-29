"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "idle" | "playing" | "done";

interface Score {
  name: string;
  score: number;
}

interface Question {
  a: number;
  b: number;
  op: string;
  answer: number;
}

function generateQuestion(score: number): Question {
  const ops =
    score < 5 ? ["+", "-"] : score < 12 ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let a: number, b: number, answer: number;

  switch (op) {
    case "+":
      a = Math.floor(Math.random() * (score < 8 ? 20 : 99)) + 1;
      b = Math.floor(Math.random() * (score < 8 ? 20 : 99)) + 1;
      answer = a + b;
      break;
    case "-":
      a = Math.floor(Math.random() * (score < 8 ? 20 : 99)) + 10;
      b = Math.floor(Math.random() * (a - 1)) + 1;
      answer = a - b;
      break;
    case "×":
      a = Math.floor(Math.random() * (score < 15 ? 9 : 12)) + 2;
      b = Math.floor(Math.random() * (score < 15 ? 9 : 12)) + 2;
      answer = a * b;
      break;
    case "÷":
      b = Math.floor(Math.random() * 11) + 2;
      answer = Math.floor(Math.random() * 11) + 2;
      a = b * answer;
      break;
    default:
      a = b = answer = 0;
  }

  return { a, b, op, answer };
}

const GAME_DURATION = 60;
const PB_KEY = "mathblitz_pb";

function playTone(freq: number, type: OscillatorType, duration: number, gain: number) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

const playCorrect = () => playTone(880, "sine", 0.12, 0.25);
const playWrong = () => playTone(160, "sawtooth", 0.18, 0.2);

export default function MathGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(0));
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [personalBest, setPersonalBest] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);

  const loadLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) setLeaderboard(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    loadLeaderboard();
    try {
      setPersonalBest(parseInt(localStorage.getItem(PB_KEY) || "0", 10));
    } catch {}
  }, [loadLeaderboard]);

  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setPhase("done");
            setShowNameInput(true);
            try {
              const pb = parseInt(localStorage.getItem(PB_KEY) || "0", 10);
              if (scoreRef.current > pb) {
                localStorage.setItem(PB_KEY, String(scoreRef.current));
                setPersonalBest(scoreRef.current);
              }
            } catch {}
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "playing") inputRef.current?.focus();
  }, [phase, question]);

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setStreak(0);
    setQuestion(generateQuestion(0));
    setInput("");
    setFlash(null);
    setShowNameInput(false);
    setPlayerName("");
    setPhase("playing");
  };

  const submitAnswer = () => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;

    if (num === question.answer) {
      const next = scoreRef.current + 1;
      scoreRef.current = next;
      setScore(next);
      setStreak((s) => s + 1);
      setFlash("correct");
      setQuestion(generateQuestion(next));
      playCorrect();
    } else {
      setStreak(0);
      setFlash("wrong");
      playWrong();
    }

    setInput("");
    setTimeout(() => setFlash(null), 250);
  };

  const saveScore = async () => {
    if (!playerName.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName.trim(), score }),
      });
      await loadLeaderboard();
    } catch {}
    setSaving(false);
    setShowNameInput(false);
  };

  const timerColor =
    timeLeft > 30 ? "text-emerald-400" : timeLeft > 10 ? "text-yellow-400" : "text-red-400";

  const bgFlash =
    flash === "correct"
      ? "bg-emerald-500/10"
      : flash === "wrong"
      ? "bg-red-500/10"
      : "";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <a
        href="/"
        className="absolute top-6 left-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        ← Back to portfolio
      </a>

      {phase === "idle" && (
        <div className="text-center space-y-10 w-full max-w-xs">
          <div>
            <h1 className="text-5xl font-bold mb-3">
              Math Blitz <span className="text-yellow-400">⚡</span>
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              60 seconds. Answer as many as you can.
              <br />
              Questions get harder as your score climbs.
            </p>
            {personalBest > 0 && (
              <p className="text-indigo-400 text-sm mt-3">Your best: <span className="font-bold">{personalBest}</span></p>
            )}
          </div>

          {leaderboard.length > 0 && (
            <div className="text-left bg-zinc-900 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                Leaderboard
              </p>
              <div className="space-y-2.5">
                {leaderboard.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span
                      className={`w-5 font-mono text-xs ${
                        i === 0
                          ? "text-yellow-400"
                          : i === 1
                          ? "text-zinc-300"
                          : i === 2
                          ? "text-orange-400"
                          : "text-zinc-600"
                      }`}
                    >
                      {i + 1}.
                    </span>
                    <span className="flex-1 text-zinc-300 truncate">{entry.name}</span>
                    <span className="font-bold tabular-nums">{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-2xl font-bold text-lg transition-all"
          >
            Start game
          </button>
        </div>
      )}

      {phase === "playing" && (
        <div
          className={`w-full max-w-sm text-center space-y-10 rounded-3xl p-8 transition-colors duration-150 ${bgFlash}`}
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Score</p>
              <p className="text-4xl font-bold tabular-nums">{score}</p>
            </div>
            {streak >= 3 && (
              <div className="text-center">
                <p className="text-xs text-orange-400 uppercase tracking-widest mb-1">
                  Streak
                </p>
                <p className="text-2xl font-bold text-orange-400">🔥 {streak}</p>
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Time</p>
              <p className={`text-4xl font-bold font-mono tabular-nums ${timerColor}`}>
                {timeLeft}s
              </p>
            </div>
          </div>

          <div className="py-4">
            <p className="text-6xl font-bold tracking-tight">
              {question.a} {question.op} {question.b}
            </p>
            <p className="text-zinc-600 mt-2 text-2xl">= ?</p>
          </div>

          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
              placeholder="Answer…"
              className="w-full text-center text-3xl font-bold bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
            <p className="text-xs text-zinc-700">Press Enter to submit</p>
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="text-center space-y-8 w-full max-w-xs">
          <div>
            <p className="text-zinc-400 mb-3 text-sm uppercase tracking-widest">Time&apos;s up!</p>
            <p className="text-8xl font-bold tabular-nums">{score}</p>
            <p className="text-zinc-500 mt-2">
              {score === 1 ? "question" : "questions"} correct
            </p>
            {score >= personalBest && score > 0 && (
              <p className="text-yellow-400 text-sm mt-2 font-semibold">🏆 New personal best!</p>
            )}
            {personalBest > 0 && score < personalBest && (
              <p className="text-zinc-500 text-sm mt-2">Your best: {personalBest}</p>
            )}
          </div>

          {showNameInput ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">Add your name to the leaderboard</p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveScore()}
                placeholder="Your name"
                maxLength={20}
                autoFocus
                className="w-full text-center bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={saveScore}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save score"}
              </button>
              <button
                onClick={() => setShowNameInput(false)}
                className="w-full py-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Skip
              </button>
            </div>
          ) : (
            <>
              {leaderboard.length > 0 && (
                <div className="text-left bg-zinc-900 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                    Leaderboard
                  </p>
                  <div className="space-y-2.5">
                    {leaderboard.map((entry, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span
                          className={`w-5 font-mono text-xs ${
                            i === 0
                              ? "text-yellow-400"
                              : i === 1
                              ? "text-zinc-300"
                              : i === 2
                              ? "text-orange-400"
                              : "text-zinc-600"
                          }`}
                        >
                          {i + 1}.
                        </span>
                        <span className="flex-1 text-zinc-300 truncate">{entry.name}</span>
                        <span className="font-bold tabular-nums">{entry.score}</span>
                          </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={startGame}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-2xl font-bold text-lg transition-all"
              >
                Play again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
