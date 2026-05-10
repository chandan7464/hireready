import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../api/client";
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [jobId, setJobId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post("/api/v1/resume/upload", form);
      return res.data;
    },
    onSuccess: (data) => setJobId(data.job_id),
  });
  const { data: status } = useQuery({
    queryKey: ["resume-status", jobId],
    queryFn: () => api.get(`/api/v1/resume/${jobId}/status`).then((r) => r.data),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      return s === "done" || s === "failed" ? false : 3000;
    },
  });
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
  };
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">HireReady</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">AI Resume Analyzer</h2>
        <p className="text-gray-400 mb-8">Upload your resume and get instant AI feedback</p>
        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-12 text-center cursor-pointer transition">
          <p className="text-4xl mb-4">📄</p>
          <p className="text-gray-300 font-medium">Click to upload PDF resume</p>
          <p className="text-gray-500 text-sm mt-1">Max 10MB • PDF only</p>
          <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        </div>
        {uploadMutation.isPending && <div className="mt-6 p-4 bg-gray-900 rounded-xl text-blue-400 animate-pulse">Uploading...</div>}
        {uploadMutation.isError && <div className="mt-6 p-4 bg-red-950 rounded-xl text-red-400">Upload failed. PDF only.</div>}
        {jobId && status && (
          <div className="mt-8 bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${status.status === "done" ? "bg-green-400" : status.status === "failed" ? "bg-red-400" : "bg-yellow-400 animate-pulse"}`} />
              <span className="text-sm text-gray-400">{status.status === "done" ? "Analysis complete" : status.status === "failed" ? "Failed" : "Analyzing..."}</span>
            </div>
            {status.status === "done" && status.result && <div className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{status.result}</div>}
            {status.status === "failed" && <p className="text-red-400 text-sm">{status.error_msg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
