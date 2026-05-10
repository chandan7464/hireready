from sqlalchemy.orm import Session
from fastapi import HTTPException, Request, Depends
from app.modules.auth.models import User
from app.modules.auth.schemas import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password, create_access_token, verify_token, get_token_from_cookie
from app.core.database import get_db

def register_user(db: Session, data: RegisterRequest) -> User:
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=data.email, hashed_password=hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session, data: LoginRequest) -> str:
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account disabled")
    return create_access_token({"sub": str(user.id), "role": user.role})

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = get_token_from_cookie(request)
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = db.query(User).filter(User.id == payload["sub"]).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found")
    return user
