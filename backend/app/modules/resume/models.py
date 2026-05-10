import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey
from app.core.database import Base

class Resume(Base):
    __tablename__ = "resumes"
    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id     = Column(String, ForeignKey("users.id"), nullable=False)
    filename    = Column(String, nullable=False)
    status      = Column(String, default="pending")
    result      = Column(Text, nullable=True)
    error_msg   = Column(Text, nullable=True)
    tokens_used = Column(Integer, default=0)
    ai_cost_usd = Column(Float, default=0.0)
    tenant_id   = Column(String, nullable=True)
    created_at  = Column(DateTime, default=datetime.utcnow)
