from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.rate_limiter import limiter
from app.modules.auth.router import router as auth_router
from app.modules.resume.router import router as resume_router
from app.modules.interview.router import router as interview_router

app = FastAPI(title="HireReady API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5175",
        "http://localhost:5176",
        "https://hireready-app-self.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")
app.include_router(interview_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "HireReady API"}

@app.get("/health")
async def health():
    return {"status": "ok"}
