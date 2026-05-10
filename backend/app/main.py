from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.core.rate_limiter import limiter
from app.modules.auth.router import router as auth_router
from app.modules.resume.router import router as resume_router

app = FastAPI(title="HireReady API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.middleware("http")
async def cors_middleware(request: Request, call_next):
    origin = request.headers.get("origin", "")
    response = await call_next(request)
    if "vercel.app" in origin or "localhost" in origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "false"
        response.headers["Access-Control-Allow-Methods"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.options("/{rest_of_path:path}")
async def preflight(rest_of_path: str, request: Request):
    origin = request.headers.get("origin", "")
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "false",
        }
    )

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "HireReady API", "docs": "/docs", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}
