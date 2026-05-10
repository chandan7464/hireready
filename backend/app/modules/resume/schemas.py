from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional

class ResumeUploadResponse(BaseModel):
    job_id: str
    status: str
    message: str

class ResumeStatusResponse(BaseModel):
    job_id: str
    status: str
    result: Optional[str] = None
    error_msg: Optional[str] = None
    tokens_used: int = 0
    ai_cost_usd: float = 0.0

class ResumeListItem(BaseModel):
    id: UUID
    filename: str
    status: str
    tokens_used: int
    ai_cost_usd: float
    created_at: datetime
    class Config:
        from_attributes = True
