from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.core.rate_limiter import limiter
from app.modules.auth.router import router as auth_router
from app.modules.resume.router import router as resume_router

app = FastAPI(title="HireReady API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "HireReady API", "docs": "/docs", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}
