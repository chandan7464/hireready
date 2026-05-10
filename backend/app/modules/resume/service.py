from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException
from pypdf import PdfReader
import io
from app.modules.resume.models import Resume

def create_pending_job(db: Session, user_id: str, filename: str) -> Resume:
    job = Resume(user_id=user_id, filename=filename, status="pending")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

def get_job(db: Session, job_id: str) -> Resume:
    job = db.query(Resume).filter(Resume.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

def get_user_resumes(db: Session, user_id: str) -> list[Resume]:
    return db.query(Resume).filter(Resume.user_id == user_id).order_by(Resume.created_at.desc()).all()

def update_job_result(db: Session, job_id: str, result: str, tokens: int, cost: float):
    job = db.query(Resume).filter(Resume.id == job_id).first()
    if job:
        job.status, job.result, job.tokens_used, job.ai_cost_usd = "done", result, tokens, cost
        db.commit()

def mark_job_failed(db: Session, job_id: str, error: str):
    job = db.query(Resume).filter(Resume.id == job_id).first()
    if job:
        job.status, job.error_msg = "failed", error
        db.commit()

def update_job_processing(db: Session, job_id: str):
    job = db.query(Resume).filter(Resume.id == job_id).first()
    if job:
        job.status = "processing"
        db.commit()

async def extract_pdf_text(file: UploadFile) -> str:
    contents = await file.read()
    pdf = PdfReader(io.BytesIO(contents))
    text = "".join(page.extract_text() or "" for page in pdf.pages)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
    return text
