import ScoreCard from "./ScoreCard";
import SkillsBadges from "./SkillsBadges";
import StrengthsWeaknesses from "./StrengthsWeaknesses";
import Suggestions from "./Suggestions";
import SectionsTable from "./SectionsTable";

export default function ResultsDashboard({ data }) {
  return (
    <section id="results-dashboard" className="mt-10 space-y-6 animate-fade-in">
      {/* File info bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          {data.fileName}
        </span>
        <span className="text-white/10">|</span>
        <span>{(data.fileSize / 1024).toFixed(1)} KB</span>
        <span className="text-white/10">|</span>
        <span>{data.pages} {data.pages === 1 ? "page" : "pages"}</span>
      </div>

      {/* ATS Score */}
      <ScoreCard score={data.score} />

      {/* Skills */}
      <SkillsBadges matched={data.matchedSkills} missing={data.missingSkills} />

      {/* Sections Table */}
      <SectionsTable sections={data.sections} />

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknesses strengths={data.strengths} weaknesses={data.weaknesses} />

      {/* Suggestions */}
      <Suggestions suggestions={data.suggestions} />
    </section>
  );
}
