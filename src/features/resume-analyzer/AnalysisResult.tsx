import React from 'react';

interface Props {
  status: string;
  result?: string;
  error?: string;
}

export const AnalysisResult: React.FC<Props> = ({ status, result, error }) => {
  if (status === 'processing' || status === 'pending') {
    return (
      <div className="p-8 text-center bg-white shadow rounded-lg mt-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing your resume...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg mt-4">
        <p>Error: {result || error || 'Analysis failed'}</p>
      </div>
    );
  }

  if (status === 'done' && result) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg mt-4 border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis Result</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
          {result}
        </div>
      </div>
    );
  }

  return null;
};
