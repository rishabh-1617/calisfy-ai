from datetime import datetime
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(120))
    experience_level: Mapped[str] = mapped_column(String(32), default="Beginner")
    primary_goal: Mapped[str] = mapped_column(String(255), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Exercise(Base):
    __tablename__ = "exercises"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    category: Mapped[str] = mapped_column(String(40))
    muscle_group: Mapped[str] = mapped_column(String(40))
    difficulty: Mapped[str] = mapped_column(String(32))
    equipment: Mapped[str] = mapped_column(String(64))
    is_hold: Mapped[bool] = mapped_column(Boolean, default=False)
    instructions: Mapped[list] = mapped_column(JSON)
    common_mistakes: Mapped[list] = mapped_column(JSON)
    safety_tips: Mapped[list] = mapped_column(JSON)
