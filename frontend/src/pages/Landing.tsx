import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Landing() {
  const { user, fetchMe } = useAuth();

  useEffect(() => {
    fetchMe().then(() => {});
  }, []);

  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">HireReady</h1>
        <div className="flex gap-4">
          <a href="/login" className="text-gray-400 hover:text-white transition">Sign In</a>
          <a href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition">Get Started Free</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
          🚀 AI-Powered Resume Analyzer
        </div>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Get Hired <span className="text-blue-400">Faster</span><br />with AI Resume Analysis
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Upload your resume and get instant AI feedback. ATS score, grammar check, 
          keyword optimization, and actionable tips in 60 seconds.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/register" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition">
            Analyze My Resume Free →
          </a>
          <a href="#features" className="border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-xl font-semibold text-lg transition">
            See How It Works
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan</p>
      </div>

      {/* Stats */}
      <div className="border-y border-gray-800 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400">16</div>
            <div className="text-gray-400 mt-1">Resume Checks</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400">60s</div>
            <div className="text-gray-400 mt-1">Analysis Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400">Free</div>
            <div className="text-gray-400 mt-1">To Get Started</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Everything You Need to Get Hired</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { icon: "🎯", title: "ATS Score", desc: "Know if your resume passes Applicant Tracking Systems used by top companies" },
            { icon: "🤖", title: "AI Analysis", desc: "Get detailed feedback powered by advanced AI trained on millions of resumes" },
            { icon: "��", title: "16-Point Check", desc: "Content, format, skills, style — every aspect of your resume reviewed" },
            { icon: "🔍", title: "Job Matching", desc: "Paste any job description and see how well your resume matches" },
            { icon: "✍️", title: "Smart Tips", desc: "Get specific, actionable suggestions to improve your resume score" },
            { icon: "🇮🇳", title: "India Focused", desc: "Optimized for Indian job market — Naukri, LinkedIn, campus hiring" },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-900/50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-400 text-center mb-16">Start free, upgrade when you need more</p>
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-lg font-semibold text-gray-400 mb-2">Free</div>
              <div className="text-4xl font-bold mb-1">₹0</div>
              <div className="text-gray-500 text-sm mb-6">Forever free</div>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {["5 resume analyses/month", "ATS score", "Basic feedback", "PDF upload"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-green-400">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/register" className="block text-center border border-gray-700 hover:border-blue-500 py-3 rounded-xl font-semibold transition">
                Get Started Free
              </a>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-lg font-semibold text-blue-200 mb-2">Pro</div>
              <div className="text-4xl font-bold mb-1">₹299</div>
              <div className="text-blue-200 text-sm mb-6">per month</div>
              <ul className="space-y-3 text-sm mb-8">
                {["Unlimited analyses", "Job description matching", "Resume templates", "Interview coach", "Priority support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-yellow-400">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/register" className="block text-center bg-white text-blue-600 py-3 rounded-xl font-bold transition hover:bg-blue-50">
                Start Pro Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Hired?</h2>
        <p className="text-gray-400 mb-8">Join thousands of job seekers who improved their resume with HireReady</p>
        <a href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-bold text-lg transition">
          Analyze My Resume Now — It's Free
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 HireReady. Built for India's job seekers. 🇮🇳</p>
      </footer>
    </div>
  );
}
