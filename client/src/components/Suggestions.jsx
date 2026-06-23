const priorityStyles = {
  high: {
    border: "border-rose-500/20",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    label: "High Priority",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  medium: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    label: "Medium",
    icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z",
  },
  low: {
    border: "border-brand-500/20",
    bg: "bg-brand-500/10",
    text: "text-brand-400",
    label: "Tip",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
};

export default function Suggestions({ suggestions }) {
  // Sort: high → medium → low
  const sorted = [...suggestions].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return (order[a.priority] ?? 3) - (order[b.priority] ?? 3);
  });

  return (
    <div className="glass-card-hover p-6">
      <h2 className="section-title">
        <svg className="h-5 w-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
        Suggestions
        <span className="ml-auto rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-bold text-brand-300 ring-1 ring-brand-500/20">
          {suggestions.length}
        </span>
      </h2>

      <div className="space-y-3">
        {sorted.map((s, i) => {
          const style = priorityStyles[s.priority] || priorityStyles.low;
          return (
            <div
              key={i}
              className={`stagger-item rounded-xl border ${style.border} bg-white/[0.02] p-4 transition-all duration-200 hover:bg-white/[0.05]`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                  <svg className={`h-4 w-4 ${style.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.text} ${style.bg}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
