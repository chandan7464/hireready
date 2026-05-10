from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    email: str
    role: str
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class MessageResponse(BaseModel):
    message: str
