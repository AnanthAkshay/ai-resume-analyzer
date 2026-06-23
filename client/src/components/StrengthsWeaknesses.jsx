export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Strengths */}
      <div className="glass-card-hover p-6">
        <h2 className="section-title">
          <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H3.75" />
          </svg>
          Strengths
        </h2>
        <ul className="space-y-3">
          {strengths.map((s, i) => (
            <li
              key={i}
              className="stagger-item flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-sm text-slate-300"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="glass-card-hover p-6">
        <h2 className="section-title">
          <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Weaknesses
        </h2>
        <ul className="space-y-3">
          {weaknesses.map((w, i) => (
            <li
              key={i}
              className="stagger-item flex items-start gap-3 rounded-lg border border-amber-500/10 bg-amber-500/5 px-4 py-3 text-sm text-slate-300"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
