from fastapi import APIRouter, Depends, Response, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import set_auth_cookie, clear_auth_cookie
from app.modules.auth.schemas import RegisterRequest, LoginRequest, UserResponse, MessageResponse
from app.modules.auth import service

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return service.register_user(db, data)

@router.post("/login", response_model=MessageResponse)
async def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    token = service.login_user(db, data)
    set_auth_cookie(response, token)
    return {"message": "Login successful"}

@router.post("/logout", response_model=MessageResponse)
async def logout(response: Response):
    clear_auth_cookie(response)
    return {"message": "Logged out"}

@router.get("/me", response_model=UserResponse)
async def me(request: Request, db: Session = Depends(get_db)):
    return service.get_current_user(request, db)
