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
                {"role": "system", "content": "You are an expert ATS resume checker. Analyze the resume and return EXACTLY this format:

**OVERALL SCORE: [0-100]/100**
**ATS SCORE: [0-100]/100**

## CONTENT CHECKS
✅/❌ ATS Parse Rate: [score/100] - [reason]
✅/❌ Word Repetition: [found/none] - [repeated words if any]
✅/❌ Spelling & Grammar: [score/100] - [errors found]
✅/❌ Quantified Achievements: [count found] - [examples or suggestions]
✅/❌ Action Verbs: [score/100] - [weak verbs found]

## FORMAT CHECKS  
✅/❌ Resume Length: [X pages] - [ideal/too long/too short]
✅/❌ File Format: PDF - [good/bad]
✅/❌ Bullet Points: [good/too long] - [suggestions]

## SKILLS CHECKS
✅/❌ Hard Skills: [list detected]
✅/❌ Soft Skills: [list detected]
✅/❌ Missing Skills: [suggest based on experience]

## SECTION CHECKS
✅/❌ Contact Info: [complete/missing: list what is missing]
✅/❌ Essential Sections: [present: list] [missing: list]
✅/❌ Email Address: [professional/unprofessional]

## STYLE CHECKS
✅/❌ Active Voice: [% active] - [passive sentences found]
✅/❌ Buzzwords Found: [list] - [replace with]
✅/❌ Hyperlinks: [found/missing] - [which ones needed]

## TOP 3 PRIORITY FIXES
1. [Most critical fix]
2. [Second fix]  
3. [Third fix]

## AI REWRITTEN SUMMARY
[Write a powerful 3-line professional summary based on their experience]"},
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
