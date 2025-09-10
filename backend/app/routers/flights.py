from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import FlightSearchRequest, FlightSearchResponse, PricePredictionRequest, PricePredictionResponse
from ..crud import create_search_history, generate_mock_flights
from ..dependencies import get_current_user
from ..models import User
import joblib
import os
import random

router = APIRouter(prefix="/flights", tags=["flights"])

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../ai/price_predictor.joblib")

def load_price_model():
    """Carrega o modelo de previsão de preços"""
    try:
        return joblib.load(MODEL_PATH)
    except:
        return None

def predict_price(origin: str, destination: str, days_ahead: int) -> PricePredictionResponse:
    """Faz previsão de preço usando o modelo de ML"""
    model = load_price_model()
    if model is None:
        # Fallback para dados mockados se o modelo não estiver disponível
        base_price = random.uniform(300, 1500)
        predicted_price = base_price + (days_ahead * random.uniform(-10, 10))
        trend = "up" if predicted_price > base_price else "down"
    else:
        # Aqui seria a lógica real de previsão usando o modelo treinado
        # Por enquanto, usamos dados mockados
        predicted_price = random.uniform(300, 1500)
        trend = random.choice(["up", "down", "stable"])

    return PricePredictionResponse(
        predicted_price=round(predicted_price, 2),
        trend=trend
    )

@router.post("/search", response_model=FlightSearchResponse)
def search_flights(
    search_request: FlightSearchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Busca voos com dados mockados e registra no histórico"""
    try:
        # Gera dados mockados de voos
        # Verifica se foi enviada uma sugestão de ida e volta via query params opcionais
        # Aqui mantemos simples: se vier "round_trip" no request (por enquanto não no schema), usa ida e volta
        round_trip = False
        return_date = None
        try:
            # Tentativa de ler flags extra do request (se existirem no corpo)
            round_trip = getattr(search_request, 'round_trip', False)  # type: ignore
            return_date = getattr(search_request, 'return_date', None)  # type: ignore
        except Exception:
            pass

        flights = generate_mock_flights(
            search_request.origin,
            search_request.destination,
            search_request.departure_date,
            round_trip=bool(round_trip),
            return_date=return_date
        )

        # Registra a busca no histórico
        search_history = create_search_history(
            db=db,
            search=search_request,
            user_id=current_user.id,
            results_count=len(flights)
        )

        return FlightSearchResponse(
            flights=flights,
            search_id=f"search_{search_history.id}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error searching flights: {str(e)}"
        )

@router.post("/predict", response_model=PricePredictionResponse)
def predict_flight_price(
    prediction_request: PricePredictionRequest,
    current_user: User = Depends(get_current_user)
):
    """Faz previsão de preço usando IA"""
    try:
        prediction = predict_price(
            prediction_request.origin,
            prediction_request.destination,
            prediction_request.days_ahead
        )
        return prediction

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error predicting price: {str(e)}"
        )
