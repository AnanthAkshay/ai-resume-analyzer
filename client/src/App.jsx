import { useState } from "react";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import ResultsDashboard from "./components/ResultsDashboard";

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen pb-20">
      <Hero />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <UploadCard onResults={setResults} />
        {results && <ResultsDashboard data={results} />}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <p>
          Built with ❤️ &nbsp;·&nbsp; AI Resume Analyzer &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
