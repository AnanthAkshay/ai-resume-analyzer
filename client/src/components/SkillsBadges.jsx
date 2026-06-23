const categoryLabels = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  tools: "Tools",
};

export default function SkillsBadges({ matched, missing }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Matched Skills */}
      <div className="glass-card-hover p-6">
        <h2 className="section-title">
          <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Skills Matched
          <span className="ml-auto rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/20">
            {matched.length}
          </span>
        </h2>

        {matched.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matched.map(({ skill, category }, i) => (
              <span
                key={`${skill}-${i}`}
                className="badge-green stagger-item"
                style={{ animationDelay: `${i * 0.05}s` }}
                title={categoryLabels[category] || category}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No matching skills found.</p>
        )}
      </div>

      {/* Missing Skills */}
      <div className="glass-card-hover p-6">
        <h2 className="section-title">
          <svg className="h-5 w-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          Missing Skills
          <span className="ml-auto rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold text-rose-400 ring-1 ring-rose-500/20">
            {missing.length}
          </span>
        </h2>

        {missing.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missing.map(({ skill, category }, i) => (
              <span
                key={`${skill}-${i}`}
                className="badge-red stagger-item"
                style={{ animationDelay: `${i * 0.05}s` }}
                title={categoryLabels[category] || category}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">All tracked skills are present — great job!</p>
        )}
      </div>
    </div>
  );
}
