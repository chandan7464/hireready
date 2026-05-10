from fastapi import APIRouter, Depends, UploadFile, File, BackgroundTasks, Request, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.modules.auth.service import get_current_user
from app.modules.auth.models import User
from app.modules.resume import service
from app.modules.resume.schemas import ResumeUploadResponse, ResumeStatusResponse, ResumeListItem
from app.workers.ai_tasks import process_resume_ai

router = APIRouter(prefix="/resume", tags=["resume"])

@router.post("/upload", response_model=ResumeUploadResponse, status_code=202)
@limiter.limit("5/hour")
async def upload_resume(request: Request, background_tasks: BackgroundTasks, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    content = await service.extract_pdf_text(file)
    job = service.create_pending_job(db, str(current_user.id), file.filename)
    background_tasks.add_task(process_resume_ai, str(job.id), content)
    return {"job_id": str(job.id), "status": "pending", "message": "Analysis started"}

@router.get("/history", response_model=list[ResumeListItem])
async def history(request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return service.get_user_resumes(db, str(current_user.id))

@router.get("/{job_id}/status", response_model=ResumeStatusResponse)
async def get_status(job_id: str, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    job = service.get_job(db, job_id)
    return ResumeStatusResponse(job_id=str(job.id), status=job.status, result=job.result, error_msg=job.error_msg, tokens_used=job.tokens_used, ai_cost_usd=job.ai_cost_usd)
