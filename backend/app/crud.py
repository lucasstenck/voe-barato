from sqlalchemy.orm import Session
from .models import User, Alert, SearchHistory
from .schemas import UserCreate, AlertCreate, AlertUpdate, FlightSearchRequest
from passlib.context import CryptContext
import random
import string

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """Gera hash da senha"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha está correta"""
    return pwd_context.verify(plain_password, hashed_password)

# User CRUD
def get_user_by_email(db: Session, email: str):
    """Busca usuário por email"""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    """Cria um novo usuário"""
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    """Autentica um usuário"""
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# Alert CRUD
def get_alerts_by_user(db: Session, user_id: int):
    """Busca todos os alertas de um usuário"""
    return db.query(Alert).filter(Alert.user_id == user_id).all()

def get_alert(db: Session, alert_id: int, user_id: int):
    """Busca um alerta específico de um usuário"""
    return db.query(Alert).filter(Alert.id == alert_id, Alert.user_id == user_id).first()

def create_alert(db: Session, alert: AlertCreate, user_id: int):
    """Cria um novo alerta"""
    db_alert = Alert(**alert.model_dump(), user_id=user_id)
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

def update_alert(db: Session, alert_id: int, alert_update: AlertUpdate, user_id: int):
    """Atualiza um alerta"""
    db_alert = get_alert(db, alert_id, user_id)
    if db_alert:
        update_data = alert_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_alert, field, value)
        db.commit()
        db.refresh(db_alert)
    return db_alert

def delete_alert(db: Session, alert_id: int, user_id: int):
    """Deleta um alerta"""
    db_alert = get_alert(db, alert_id, user_id)
    if db_alert:
        db.delete(db_alert)
        db.commit()
    return db_alert

# Search History CRUD
def get_search_history_by_user(db: Session, user_id: int, limit: int = 50):
    """Busca histórico de buscas de um usuário"""
    return db.query(SearchHistory).filter(SearchHistory.user_id == user_id)\
        .order_by(SearchHistory.search_date.desc()).limit(limit).all()

def create_search_history(db: Session, search: FlightSearchRequest, user_id: int, results_count: int = 0):
    """Cria um registro no histórico de buscas"""
    db_search = SearchHistory(
        user_id=user_id,
        origin=search.origin,
        destination=search.destination,
        departure_date=search.departure_date,
        results_count=results_count
    )
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

# Mock data functions
BRAZIL_AIRPORTS = {
    "GRU", "CGH", "VCP", "GIG", "SDU", "BSB", "CNF", "SSA", "REC", "FOR",
    "BEL", "MAO", "POA", "FLN", "CWB", "VIX", "NAT", "CGR", "GYN", "JPA",
    "IGU", "MCZ", "SLZ", "PMW", "UDI", "CGB", "CWB", "JOI", "LDB", "LDB",
}

def is_domestic_br(origin: str, destination: str) -> bool:
    return origin.upper() in BRAZIL_AIRPORTS and destination.upper() in BRAZIL_AIRPORTS


def generate_mock_flights(origin: str, destination: str, departure_date: str, round_trip: bool = False, return_date: str | None = None):
    """Gera dados mockados de voos. Se round_trip=True, inclui preços de ida/volta e total."""
    # Companhias nacionais mais comuns
    airlines = ["LATAM", "GOL", "AZUL"]
    flights = []

    for i in range(random.randint(5, 10)):
        flight_id = f"{random.choice(airlines)[:2]}{random.randint(1000, 9999)}"
        price = round(random.uniform(200, 2000), 2)

        # URL mockada para provedores populares
        provider = random.choice(["skyscanner", "kayak"]) 
        if provider == "skyscanner":
            # formato aproximado (mock)
            if round_trip and return_date:
                url = (
                    f"https://www.skyscanner.com/transport/flights/{origin.lower()}/{destination.lower()}/"
                    f"{departure_date.replace('-', '')}/{return_date.replace('-', '')}/"
                    "?adults=1&cabinclass=economy&preferdirects=false"
                )
            else:
                url = f"https://www.skyscanner.com/transport/flights/{origin.lower()}/{destination.lower()}/{departure_date.replace('-', '')}/?adults=1&cabinclass=economy"
        else:
            # Kayak ida e volta exibe com ambos os trechos
            if round_trip and return_date:
                url = f"https://www.kayak.com/flights/{origin}-{destination}/{departure_date}/{return_date}?sort=bestflight_a"
            else:
                url = f"https://www.kayak.com/flights/{origin}-{destination}/{departure_date}?sort=bestflight_a"

        # Preços mais realistas: faixas diferentes para doméstico BR vs. outros
        if is_domestic_br(origin, destination):
            # one-way normalmente entre 150 e 900, média ~450
            outbound = round(max(150, random.gauss(450, 150)), 2)
            inbound = round(max(150, random.gauss(450, 150)), 2) if round_trip else None
        else:
            # internacional simplificado
            outbound = round(max(400, random.gauss(1200, 350)), 2)
            inbound = round(max(400, random.gauss(1200, 350)), 2) if round_trip else None
        total = round(outbound + (inbound or 0), 2)

        flight = {
            "id": f"{flight_id}_{i}",
            "airline": random.choice(airlines),
            "flight_number": flight_id,
            "origin": origin,
            "destination": destination,
            "departure_time": f"{random.randint(6, 22):02d}:{random.randint(0, 59):02d}",
            "arrival_time": f"{random.randint(6, 22):02d}:{random.randint(0, 59):02d}",
            "duration": f"{random.randint(1, 8)}h {random.randint(0, 59)}m",
            "price": total if round_trip else outbound,
            "stops": random.randint(0, 2),
            "url": url,
            "is_round_trip": round_trip,
            "outbound_price": outbound,
            "inbound_price": inbound,
        }
        flights.append(flight)

    return flights
