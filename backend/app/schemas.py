from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Schemas para User
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Schemas para Alert
class AlertBase(BaseModel):
    origin: str
    destination: str
    target_price: float

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    origin: Optional[str] = None
    destination: Optional[str] = None
    target_price: Optional[float] = None
    is_active: Optional[bool] = None

class Alert(AlertBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    last_notified: Optional[datetime]

    class Config:
        from_attributes = True

# Schemas para SearchHistory
class SearchHistoryBase(BaseModel):
    origin: str
    destination: str
    departure_date: str

class SearchHistory(SearchHistoryBase):
    id: int
    user_id: int
    search_date: datetime
    results_count: int

    class Config:
        from_attributes = True

# Schemas para Flight Search
class FlightSearchRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str
    round_trip: Optional[bool] = False
    return_date: Optional[str] = None

class Flight(BaseModel):
    id: str
    airline: str
    flight_number: str
    origin: str
    destination: str
    departure_time: str
    arrival_time: str
    duration: str
    price: float
    stops: int
    url: Optional[str] = None
    # Campos adicionais para ida e volta
    is_round_trip: Optional[bool] = False
    outbound_price: Optional[float] = None
    inbound_price: Optional[float] = None

class FlightSearchResponse(BaseModel):
    flights: List[Flight]
    search_id: str

# Schemas para Price Prediction
class PricePredictionRequest(BaseModel):
    origin: str
    destination: str
    days_ahead: int

class PricePredictionResponse(BaseModel):
    predicted_price: float
    trend: str  # "up", "down", "stable"

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
