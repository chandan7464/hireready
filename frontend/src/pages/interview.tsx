import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../api/client";

export default function Interview() {
  const { user, logout } = useAuth();
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [step, setStep] = useState<"input" | "questions">("input");

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/v1/interview/generate", { job_role: jobRole });
      return res.data;
    },
    onSuccess: (data) => {
      setQuestions(data.questions);
      setStep("questions");
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async ({ idx, answer }: { idx: number; answer: string }) => {
      const res = await api.post("/api/v1/interview/feedback", {
        question: questions[idx],
        answer,
        job_role: jobRole,
      });
      return { idx, feedback: res.data.feedback };
    },
    onSuccess: ({ idx, feedback: fb }) => {
      setFeedback(prev => ({ ...prev, [idx]: fb }));
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <a href="/" className="text-xl font-bold text-blue-400">HireReady</a>
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">Resume</a>
          <a href="/job-match" className="text-gray-400 hover:text-white text-sm">Job Match</a>
          <a href="/interview" className="text-blue-400 text-sm font-semibold">Interview</a>
          <button onClick={logout} className="text-sm text-red-400">Logout</button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">Interview Coach</h2>
        <p className="text-gray-400 mb-8">Practice AI-generated interview questions for your target role</p>

        {step === "input" ? (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">
              What role are you interviewing for?
            </label>
            <input type="text" value={jobRole} onChange={e => setJobRole(e.target.value)}
              placeholder="e.g. Python Developer, Data Analyst"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mb-6"/>
            <button onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending || !jobRole}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition">
              {generateMutation.isPending ? "Generating Questions..." : "Generate Interview Questions"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-900/20 rounded-2xl p-4 border border-blue-800">
              <p className="text-blue-400 font-semibold">Role: {jobRole}</p>
            </div>
            {questions.map((q, idx) => (
              <div key={idx} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="flex gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{idx + 1}</span>
                  <p className="text-white font-medium">{q}</p>
                </div>
                <textarea value={answers[idx] || ""} onChange={e => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                  placeholder="Type your answer here..."
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm h-28 resize-none mb-3"/>
                {!feedback[idx] ? (
                  <button onClick={() => feedbackMutation.mutate({ idx, answer: answers[idx] || "" })}
                    disabled={!answers[idx] || feedbackMutation.isPending}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Get AI Feedback
                  </button>
                ) : (
                  <div className="bg-green-950/30 rounded-xl p-4 border border-green-900">
                    <p className="text-green-400 font-semibold text-sm mb-1">AI Feedback:</p>
                    <p className="text-gray-300 text-sm">{feedback[idx]}</p>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => { setStep("input"); setQuestions([]); setAnswers({}); setFeedback({}); }}
              className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-semibold transition">
              Try Different Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
