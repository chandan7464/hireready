import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../../api/client';
import { RESUME_UPLOAD, RESUME_STATUS } from '../../api/endpoints';
import { ResumeUploadResponse, ResumeStatusResponse } from '../../types/resume.types';

export const useResumeAnalysis = (jobId: string | null) => {
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await client.post<ResumeUploadResponse>(RESUME_UPLOAD, formData);
      return response.data;
    },
  });

  const statusQuery = useQuery({
    queryKey: ['resumeStatus', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('No job ID');
      const response = await client.get<ResumeStatusResponse>(RESUME_STATUS(jobId));
      return response.data;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state?.data?.status;
      if (status === 'done' || status === 'failed') return false;
      return 3000;
    },
  });

  return { uploadMutation, statusQuery };
};
