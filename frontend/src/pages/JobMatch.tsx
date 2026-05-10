import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../api/client";

const ScoreRing = ({ score }: { score: number }) => {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444";
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1f2937" strokeWidth="12"/>
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 70 70)"/>
        <text x="70" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">{score}%</text>
        <text x="70" y="85" textAnchor="middle" fill="#9ca3af" fontSize="12">Match</text>
      </svg>
      <span style={{color}} className="font-bold text-lg mt-2">
        {score >= 80 ? "Excellent Match! 🎯" : score >= 60 ? "Good Match 👍" : "Needs Work ⚠️"}
      </span>
    </div>
  );
};

export default function JobMatch() {
  const { user, logout } = useAuth();
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);

  const matchMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/v1/resume/job-match", {
        resume_text: resumeText,
        job_description: jobDesc,
      });
      return res.data;
    },
    onSuccess: (data) => setResult(data),
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <a href="/" className="text-xl font-bold text-blue-400">HireReady</a>
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">Resume Analyzer</a>
          <a href="/job-match" className="text-blue-400 text-sm font-semibold">Job Match</a>
          <a href="/interview" className="text-gray-400 hover:text-white text-sm">Interview Coach</a>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">Job Description Matcher</h2>
        <p className="text-gray-400 mb-8">Paste your resume and job description to see how well you match</p>

        {!result ? (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                📄 Your Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm h-48 resize-none"
              />
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                💼 Job Description
              </label>
              <textarea
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm h-48 resize-none"
              />
            </div>

            <button
              onClick={() => matchMutation.mutate()}
              disabled={matchMutation.isPending || !resumeText || !jobDesc}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition"
            >
              {matchMutation.isPending ? "🤖 Analyzing Match..." : "Check Job Match →"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 flex flex-col items-center">
              <ScoreRing score={result.match_score} />
            </div>

            {/* Matched Keywords */}
            <div className="bg-green-950/30 rounded-2xl p-6 border border-green-900">
              <h3 className="text-green-400 font-bold mb-3">✅ Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords?.map((k: string, i: number) => (
                  <span key={i} className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm">{k}</span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-red-950/30 rounded-2xl p-6 border border-red-900">
              <h3 className="text-red-400 font-bold mb-3">❌ Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords?.map((k: string, i: number) => (
                  <span key={i} className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-sm">{k}</span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-950/30 rounded-2xl p-6 border border-blue-900">
              <h3 className="text-blue-400 font-bold mb-3">💡 How to Improve</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{result.suggestions}</p>
            </div>

            <button
              onClick={() => { setResult(null); matchMutation.reset(); }}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
            >
              Try Another Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
