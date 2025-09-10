import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os
import random
from datetime import datetime, timedelta

def generate_flight_history_csv(filename: str = "flights_history.csv", num_records: int = 10000):
    """Gera um arquivo CSV com dados históricos de voos para treinamento"""

    # Lista de aeroportos brasileiros (códigos IATA)
    airports = ["GRU", "CGH", "SDU", "GIG", "BSB", "SSA", "FOR", "REC", "POA", "FLN", "CWB", "VCP", "BEL", "CGB", "NAT"]

    data = []

    for _ in range(num_records):
        # Selecionar origem e destino diferentes
        origin = random.choice(airports)
        destination = random.choice([a for a in airports if a != origin])

        # Gerar datas
        days_ahead = random.randint(1, 90)  # 1 a 90 dias no futuro
        search_date = datetime.now() - timedelta(days=random.randint(1, 365))
        departure_date = search_date + timedelta(days=days_ahead)

        # Calcular preço baseado em fatores
        base_price = random.uniform(200, 1000)
        # Preços tendem a aumentar quanto mais próximo da data
        price_multiplier = 1 + (1 / days_ahead) * 0.5
        # Variação aleatória
        price_variation = random.uniform(0.8, 1.2)

        final_price = base_price * price_multiplier * price_variation

        data.append({
            "origin": origin,
            "destination": destination,
            "search_date": search_date.strftime("%Y-%m-%d"),
            "departure_date": departure_date.strftime("%Y-%m-%d"),
            "days_ahead": days_ahead,
            "price": round(final_price, 2)
        })

    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
    print(f"Arquivo {filename} gerado com {num_records} registros")
    return df

def train_price_prediction_model(csv_file: str = "flights_history.csv", model_file: str = "price_predictor.joblib"):
    """Treina um modelo de regressão linear para previsão de preços"""

    # Carregar dados
    df = pd.read_csv(csv_file)

    # Preparar features
    # Codificar aeroportos como números
    airports = df['origin'].unique().tolist() + df['destination'].unique().tolist()
    airports = list(set(airports))  # Remover duplicatas

    airport_codes = {airport: i for i, airport in enumerate(airports)}

    df['origin_code'] = df['origin'].map(airport_codes)
    df['destination_code'] = df['destination'].map(airport_codes)

    # Features: origem, destino, dias antecipados
    X = df[['origin_code', 'destination_code', 'days_ahead']]
    y = df['price']

    # Dividir dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Treinar modelo
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Avaliar modelo
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(".2f")
    print(".3f")

    # Salvar modelo
    joblib.dump(model, model_file)
    print(f"Modelo salvo em {model_file}")

    # Salvar mapeamento de códigos de aeroporto
    joblib.dump(airport_codes, "airport_codes.joblib")

    return model, mse, r2

def load_trained_model(model_file: str = "price_predictor.joblib"):
    """Carrega um modelo treinado"""
    try:
        return joblib.load(model_file)
    except FileNotFoundError:
        print(f"Modelo {model_file} não encontrado")
        return None

def predict_flight_price(model, airport_codes, origin: str, destination: str, days_ahead: int):
    """Faz previsão de preço usando o modelo treinado"""
    if model is None:
        return None

    try:
        origin_code = airport_codes.get(origin, 0)
        destination_code = airport_codes.get(destination, 0)

        features = np.array([[origin_code, destination_code, days_ahead]])
        prediction = model.predict(features)[0]

        return max(0, prediction)  # Garantir que o preço não seja negativo
    except Exception as e:
        print(f"Erro na previsão: {e}")
        return None

if __name__ == "__main__":
    # Exemplo de uso
    print("Gerando dados de treinamento...")
    generate_flight_history_csv()

    print("Treinando modelo...")
    model, mse, r2 = train_price_prediction_model()

    print("Testando modelo...")
    airport_codes = joblib.load("airport_codes.joblib")
    test_prediction = predict_flight_price(model, airport_codes, "GRU", "SDU", 30)
    print(f"Previsão GRU->SDU (30 dias): R$ {test_prediction:.2f}")
