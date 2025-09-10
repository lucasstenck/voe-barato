#!/usr/bin/env python3
"""
Script para popular dados e treinar o modelo de previsão de preços de passagens aéreas.
Este script deve ser executado uma vez para preparar o ambiente de IA.
"""

import os
import sys

# Adicionar o diretório pai ao path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai.model import generate_flight_history_csv, train_price_prediction_model

def main():
    """Função principal para executar o processo de seed e treinamento"""

    print("🚀 Iniciando processo de seed e treinamento do modelo de IA...")
    print("=" * 60)

    # Caminhos dos arquivos
    csv_file = "flights_history.csv"
    model_file = "price_predictor.joblib"

    # Verificar se já existe modelo treinado
    if os.path.exists(model_file):
        response = input(f"Modelo {model_file} já existe. Deseja sobrescrever? (s/n): ")
        if response.lower() != 's':
            print("❌ Processo cancelado pelo usuário.")
            return

    try:
        # Passo 1: Gerar dados históricos
        print("📊 Passo 1: Gerando dados históricos de voos...")
        df = generate_flight_history_csv(csv_file, num_records=5000)
        print(f"✅ Arquivo {csv_file} criado com {len(df)} registros.")
        print()

        # Passo 2: Treinar modelo
        print("🤖 Passo 2: Treinando modelo de previsão de preços...")
        model, mse, r2 = train_price_prediction_model(csv_file, model_file)
        print(".2f")
        print(".3f")
        print(f"✅ Modelo salvo em {model_file}")
        print()

        # Passo 3: Teste do modelo
        print("🧪 Passo 3: Testando modelo treinado...")
        from ai.model import load_trained_model, predict_flight_price
        import joblib

        loaded_model = load_trained_model(model_file)
        airport_codes = joblib.load("airport_codes.joblib")

        # Testes de exemplo
        test_cases = [
            ("GRU", "SDU", 7),   # São Paulo -> Rio, 7 dias
            ("GRU", "SSA", 30),  # São Paulo -> Salvador, 30 dias
            ("GIG", "POA", 15),  # Rio -> Porto Alegre, 15 dias
        ]

        print("📈 Previsões de teste:")
        for origin, destination, days in test_cases:
            prediction = predict_flight_price(loaded_model, airport_codes, origin, destination, days)
            if prediction:
                print("2d")
            else:
                print(f"❌ Erro na previsão {origin}->{destination}")
        print()

        print("🎉 Processo concluído com sucesso!")
        print("=" * 60)
        print("📁 Arquivos gerados:")
        print(f"   - {csv_file} (dados de treinamento)")
        print(f"   - {model_file} (modelo treinado)")
        print(f"   - airport_codes.joblib (mapeamento de aeroportos)")
        print()
        print("💡 O backend agora pode usar o modelo para previsões em tempo real!")

    except Exception as e:
        print(f"❌ Erro durante o processo: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
