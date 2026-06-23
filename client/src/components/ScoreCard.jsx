import { useEffect, useState } from "react";

export default function ScoreCard({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animated counter
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(score / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        start = score;
        clearInterval(timer);
      }
      setDisplayScore(start);
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  // SVG circle calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color based on score
  function getScoreColor() {
    if (score >= 75) return { stroke: "#10b981", text: "text-emerald-400", label: "Excellent", bg: "from-emerald-500/20 to-emerald-500/5" };
    if (score >= 50) return { stroke: "#f59e0b", text: "text-amber-400", label: "Good", bg: "from-amber-500/20 to-amber-500/5" };
    return { stroke: "#ef4444", text: "text-rose-400", label: "Needs Work", bg: "from-rose-500/20 to-rose-500/5" };
  }

  const color = getScoreColor();

  return (
    <div className="glass-card animate-scale-in overflow-hidden">
      <div className={`bg-gradient-to-br ${color.bg} p-6 sm:p-8`}>
        <h2 className="section-title">
          <svg className="h-5 w-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          ATS Score
        </h2>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          {/* Circular score */}
          <div className="relative flex-shrink-0">
            <svg className="h-44 w-44 -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80" cy="80" r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />
              {/* Score arc */}
              <circle
                className="score-circle"
                cx="80" cy="80" r={radius}
                fill="none"
                stroke={color.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ filter: `drop-shadow(0 0 8px ${color.stroke}40)` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold ${color.text}`}>
                {displayScore}
              </span>
              <span className="text-xs font-medium text-slate-400">/ 100</span>
            </div>
          </div>

          {/* Score details */}
          <div className="text-center sm:text-left">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${color.text} bg-white/5 ring-1 ring-white/10`}>
              {color.label}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {score >= 75
                ? "Your resume is well-optimized for ATS systems. Keep refining to stay competitive."
                : score >= 50
                ? "Your resume has a decent foundation. Address the missing skills and sections below for a stronger score."
                : "Your resume needs significant improvement. Follow the suggestions below to boost your ATS compatibility."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
