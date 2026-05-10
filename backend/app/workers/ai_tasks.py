import litellm
from app.core.config import settings
from app.core.database import SessionLocal
from app.modules.resume import service as resume_service

litellm.set_verbose = False

async def process_resume_ai(job_id: str, content: str):
    db = SessionLocal()
    try:
        resume_service.update_job_processing(db, job_id)
        response = await litellm.acompletion(
            model="openrouter/qwen/qwen-2.5-72b-instruct",
            api_key=settings.OPENROUTER_API_KEY,
            messages=[
                {"role": "system", "content": "You are an expert resume reviewer. Provide: 1. Overall Score /10  2. Key Strengths  3. Areas to Improve  4. Actionable Tips  5. ATS Score /10"},
                {"role": "user", "content": f"Analyze this resume:\n\n{content[:8000]}"},
            ],
            max_tokens=1500,
        )
        result_text = response.choices[0].message.content
        tokens = response.usage.total_tokens
        cost = round(tokens * 0.000001, 6)
        resume_service.update_job_result(db, job_id, result_text, tokens, cost)
    except Exception as e:
        resume_service.mark_job_failed(db, job_id, str(e))
    finally:
        db.close()
