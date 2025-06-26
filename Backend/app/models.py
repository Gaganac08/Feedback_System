from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from pydantic import BaseModel
from typing import Optional

# ---------- SQLAlchemy Models ----------

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)  # Example: admin, manager, employee

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text)
    from_user = Column(Integer, ForeignKey("users.id"))
    to_user = Column(Integer, ForeignKey("users.id"))

# ---------- Pydantic Models ----------

class FeedbackRequest(BaseModel):
    message: str
    from_user: Optional[int]
    to_user: Optional[int]

class UserRequest(BaseModel):
    username: str
    password: str
    role: Optional[str] = "employee"

class UserResponse(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        orm_mode = True

class FeedbackResponse(BaseModel):
    id: int
    message: str
    from_user: int
    to_user: int

    class Config:
        orm_mode = True
