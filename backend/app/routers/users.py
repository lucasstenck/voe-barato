from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import Alert, AlertCreate, AlertUpdate, SearchHistory
from ..crud import (
    get_alerts_by_user, get_alert, create_alert, update_alert, delete_alert,
    get_search_history_by_user
)
from ..dependencies import get_current_user
from ..models import User

router = APIRouter(prefix="/users", tags=["users"])

# Alert routes
@router.get("/me/alerts", response_model=list[Alert])
def read_user_alerts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Retorna todos os alertas do usuário logado"""
    alerts = get_alerts_by_user(db, current_user.id)
    return alerts

@router.post("/me/alerts", response_model=Alert)
def create_user_alert(
    alert: AlertCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Cria um novo alerta para o usuário logado"""
    try:
        return create_alert(db, alert, current_user.id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating alert: {str(e)}"
        )

@router.put("/me/alerts/{alert_id}", response_model=Alert)
def update_user_alert(
    alert_id: int,
    alert_update: AlertUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Atualiza um alerta do usuário logado"""
    db_alert = update_alert(db, alert_id, alert_update, current_user.id)
    if db_alert is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    return db_alert

@router.delete("/me/alerts/{alert_id}")
def delete_user_alert(
    alert_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Deleta um alerta do usuário logado"""
    db_alert = delete_alert(db, alert_id, current_user.id)
    if db_alert is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    return {"message": "Alert deleted successfully"}

@router.post("/me/alerts/{alert_id}/notify_test")
def test_alert_notification(
    alert_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Endpoint para testar notificação de alerta (simulado)"""
    db_alert = get_alert(db, alert_id, current_user.id)
    if db_alert is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )

    # Simula o envio de notificação
    # No frontend, isso seria chamado para testar as notificações push
    return {
        "message": f"Test notification sent for alert {alert_id}",
        "alert": {
            "origin": db_alert.origin,
            "destination": db_alert.destination,
            "target_price": db_alert.target_price
        }
    }

# Search history routes
@router.get("/me/history", response_model=list[SearchHistory])
def read_user_search_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retorna o histórico de buscas do usuário logado"""
    history = get_search_history_by_user(db, current_user.id)
    return history
