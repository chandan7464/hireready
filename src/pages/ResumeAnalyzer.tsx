import React, { useState } from 'react';
import { ResumeUploader } from '../features/resume-analyzer/ResumeUploader';
import { AnalysisResult } from '../features/resume-analyzer/AnalysisResult';
import { useResumeAnalysis } from '../features/resume-analyzer/useResumeAnalysis';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  </div>
);

export const ResumeAnalyzer: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const { uploadMutation, statusQuery } = useResumeAnalysis(jobId);

  return (
    <DashboardLayout>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Resume Analyzer</h1>
        <p className="mt-2 text-lg text-gray-600">Upload your PDF resume for instant AI feedback</p>
      </div>
      
      {!jobId && (
        <ResumeUploader 
          onSuccess={setJobId} 
          uploadMutation={uploadMutation} 
        />
      )}

      {jobId && statusQuery.data && (
        <AnalysisResult 
          status={statusQuery.data.status} 
          result={statusQuery.data.result} 
        />
      )}
    </DashboardLayout>
  );
};
