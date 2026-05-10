from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
import litellm
from app.core.database import get_db
from app.core.config import settings
from app.modules.auth.service import get_current_user
from app.modules.auth.models import User

router = APIRouter(prefix="/interview", tags=["interview"])

class GenerateRequest(BaseModel):
    job_role: str

class FeedbackRequest(BaseModel):
    question: str
    answer: str
    job_role: str

@router.post("/generate")
async def generate_questions(
    data: GenerateRequest,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    response = await litellm.acompletion(
        model="openrouter/qwen/qwen-2.5-72b-instruct",
        api_key=settings.OPENROUTER_API_KEY,
        messages=[
            {
                "role": "system",
                "content": "Generate exactly 5 interview questions for the given role. Return as JSON: {\"questions\": [\"q1\", \"q2\", \"q3\", \"q4\", \"q5\"]}. JSON only, no extra text."
            },
            {
                "role": "user",
                "content": f"Generate 5 interview questions for: {data.job_role}"
            }
        ],
        max_tokens=500,
    )
    import json
    text = response.choices[0].message.content.strip()
    try:
        clean = text.strip("```json").strip("```").strip()
        return json.loads(clean)
    except:
        return {"questions": [
            f"Tell me about your experience with {data.job_role}",
            "What are your key technical skills?",
            "Describe a challenging project you worked on",
            "Where do you see yourself in 5 years?",
            "Why do you want this role?"
        ]}

@router.post("/feedback")
async def get_feedback(
    data: FeedbackRequest,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    response = await litellm.acompletion(
        model="openrouter/qwen/qwen-2.5-72b-instruct",
        api_key=settings.OPENROUTER_API_KEY,
        messages=[
            {
                "role": "system",
                "content": "You are an expert interviewer. Give brief, constructive feedback on the interview answer. Be specific, encouraging, and mention what was good and what to improve. Max 3 sentences."
            },
            {
                "role": "user",
                "content": f"Role: {data.job_role}\nQuestion: {data.question}\nAnswer: {data.answer}\n\nGive feedback:"
            }
        ],
        max_tokens=300,
    )
    return {"feedback": response.choices[0].message.content}
