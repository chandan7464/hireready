export interface ResumeStatusResponse {
  job_id: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  result?: string;
}

export interface ResumeUploadResponse {
  job_id: string;
  status: string;
}

export interface ResumeListItem {
  id: string;
  filename: string;
  status: string;
  created_at: string;
}
