from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    """Modelo para usuários da plataforma"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relacionamentos
    alerts = relationship("Alert", back_populates="user", cascade="all, delete-orphan")
    search_history = relationship("SearchHistory", back_populates="user", cascade="all, delete-orphan")

class Alert(Base):
    """Modelo para alertas de preço"""
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    origin = Column(String(3), nullable=False)  # Código IATA (ex: GRU)
    destination = Column(String(3), nullable=False)  # Código IATA (ex: SDU)
    target_price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_notified = Column(DateTime(timezone=True), nullable=True)

    # Relacionamento
    user = relationship("User", back_populates="alerts")

class SearchHistory(Base):
    """Modelo para histórico de buscas"""
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    origin = Column(String(3), nullable=False)
    destination = Column(String(3), nullable=False)
    departure_date = Column(String, nullable=False)  # Formato YYYY-MM-DD
    search_date = Column(DateTime(timezone=True), server_default=func.now())
    results_count = Column(Integer, default=0)

    # Relacionamento
    user = relationship("User", back_populates="search_history")
