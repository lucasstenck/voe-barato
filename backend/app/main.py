from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, flights, users

# Criar tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Inicializar aplicação FastAPI
app = FastAPI(
    title="Plataforma de Monitoramento de Passagens Aéreas",
    description="API para monitoramento de preços de passagens aéreas com IA",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router)
app.include_router(flights.router)
app.include_router(users.router)

@app.get("/")
def root():
    """Endpoint raiz da API"""
    return {
        "message": "Plataforma de Monitoramento de Passagens Aéreas",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Endpoint para verificação de saúde da API"""
    return {"status": "healthy"}
