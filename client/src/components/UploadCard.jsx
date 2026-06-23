import { useState, useRef } from "react";
import axios from "axios";

export default function UploadCard({ onResults }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  function validate(f) {
    if (!f) return "Please select a file.";
    if (f.type !== "application/pdf") return "Only PDF files are accepted.";
    if (f.size > MAX_SIZE) return "File size exceeds the 5 MB limit.";
    return "";
  }

  function handleFile(f) {
    const err = validate(f);
    setError(err);
    if (!err) setFile(f);
    else setFile(null);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }

  function handleChange(e) {
    handleFile(e.target.files?.[0]);
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        onResults(data);
      } else {
        setError(data.error || "Analysis failed.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setError("");
    onResults(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section id="upload-section" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="glass-card mx-auto max-w-2xl p-6 sm:p-8">
        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all duration-300
            ${dragActive
              ? "border-brand-400 bg-brand-500/10"
              : "border-white/15 hover:border-brand-400/50 hover:bg-white/[0.03]"
            }`}
        >
          <input
            ref={inputRef}
            id="resume-input"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
          />

          {/* Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20 transition-transform duration-300 group-hover:scale-110">
            <svg className="h-8 w-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>

          <p className="text-sm font-medium text-slate-300">
            {dragActive ? "Drop your resume here" : "Drag & drop your resume here"}
          </p>
          <p className="mt-1 text-xs text-slate-500">or click to browse &nbsp;·&nbsp; PDF only &nbsp;·&nbsp; Max 5 MB</p>
        </div>

        {/* Selected file */}
        {file && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                <svg className="h-5 w-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white truncate max-w-[240px] sm:max-w-[360px]">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Remove file">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {/* Analyze button */}
        <button
          id="analyze-button"
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300
            ${!file || uploading
              ? "cursor-not-allowed bg-white/5 text-slate-500"
              : "bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110 active:scale-[0.98]"
            }`}
        >
          {uploading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing…
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </section>
  );
}
