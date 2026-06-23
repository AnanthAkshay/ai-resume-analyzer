export default function Hero() {
  return (
    <header className="relative overflow-hidden py-16 sm:py-24">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          POWERED BY INTELLIGENT ANALYSIS
        </div>

        {/* Title */}
        <h1 className="animate-fade-in text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          AI Resume{" "}
          <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Analyzer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl animate-fade-in text-base leading-relaxed text-slate-400 sm:text-lg" style={{ animationDelay: "0.15s" }}>
          Get your ATS score, identify skill gaps, and receive actionable
          suggestions to make your resume stand out — all in seconds.
        </p>

        {/* Decorative stats */}
        <div className="mx-auto mt-10 flex max-w-lg animate-fade-in flex-wrap items-center justify-center gap-8 text-sm text-slate-500" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>ATS Scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span>Skill Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>Smart Suggestions</span>
          </div>
        </div>
      </div>
    </header>
  );
}
