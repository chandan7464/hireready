import React, { useState, useCallback } from 'react';

interface Props {
  onSuccess: (jobId: string) => void;
  uploadMutation: any;
}

export const ResumeUploader: React.FC<Props> = ({ onSuccess, uploadMutation }) => {
  const [error, setError] = useState<string>('');

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setError('');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    if (file) {
      try {
        const data = await uploadMutation.mutateAsync(file);
        onSuccess(data.job_id);
      } catch (err) {
        setError('Upload failed');
      }
    }
  }, [uploadMutation, onSuccess]);

  return (
    <div 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
    >
      <p className="text-gray-600">Drag and drop your PDF resume here</p>
      {uploadMutation.isPending && <p className="text-blue-500 mt-2">Uploading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
