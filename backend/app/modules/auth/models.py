import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    id              = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email           = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    role            = Column(String, default="free_user")
    is_active       = Column(Boolean, default=True)
    tenant_id       = Column(String, nullable=True)
    created_at      = Column(DateTime, default=datetime.utcnow)
