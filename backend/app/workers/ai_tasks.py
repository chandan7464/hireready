import litellm
from app.core.config import settings
from app.core.database import SessionLocal
from app.modules.resume import service as resume_service

litellm.set_verbose = False

SYSTEM_PROMPT = (
    "You are an expert ATS resume checker. Analyze the resume and provide: "
    "1. OVERALL SCORE (0-100)/100 "
    "2. ATS SCORE (0-100)/100 "
    "3. CONTENT CHECKS: ATS Parse Rate, Word Repetition, Spelling & Grammar, Quantified Achievements, Action Verbs "
    "4. FORMAT CHECKS: Resume Length, Bullet Points "
    "5. SKILLS: Hard Skills found, Soft Skills found, Missing Skills "
    "6. SECTIONS: Contact Info, Essential Sections, Email Address "
    "7. STYLE: Active Voice %, Buzzwords found, Hyperlinks check "
    "8. TOP 3 PRIORITY FIXES "
    "9. AI REWRITTEN SUMMARY (3 lines) "
    "Be specific, professional and constructive."
)

async def process_resume_ai(job_id: str, content: str):
    db = SessionLocal()
    try:
        resume_service.update_job_processing(db, job_id)
        response = await litellm.acompletion(
            model="openrouter/qwen/qwen-2.5-72b-instruct",
            api_key=settings.OPENROUTER_API_KEY,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze this resume:\n\n{content[:8000]}"},
            ],
            max_tokens=2000,
        )
        result_text = response.choices[0].message.content
        tokens = response.usage.total_tokens
        cost = round(tokens * 0.000001, 6)
        resume_service.update_job_result(db, job_id, result_text, tokens, cost)
    except Exception as e:
        resume_service.mark_job_failed(db, job_id, str(e))
    finally:
        db.close()
