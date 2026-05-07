import requests
import random
from datetime import datetime

class CommodityCollector:
    def __init__(self):
        # Aqui ficará a URL real no futuro
        self.api_url = "https://api.exemplo.com/v1/commodities"

    def fetch_mock_data(self, symbol):
        """
        Gera dados fictícios para teste, simulando o comportamento de uma API.
        """
        # Simulando preços base do mercado agrícola atual
        # Soja aprox R$ 135,00 / Milho aprox R$ 58,00
        base_price = 135.0 if symbol == "SOJA" else 58.0
        variation = random.uniform(-1.5, 1.5)
        
        # O retorno é um DICTIONARY (Chave: Valor)
        data = {
            "symbol": symbol,
            "price": round(base_price + variation, 2),
            "timestamp": datetime.utcnow(),
            "source": "Simulated Market Data"
        }
        return data

# O bloco abaixo só roda se você executar o arquivo DIRETAMENTE.
# Quando o main_pipeline.py importa este arquivo, ele IGNORA o que está aqui dentro.
if __name__ == "__main__":
    collector = CommodityCollector()
    print("--- Teste Isolado do Coletor ---")
    print(collector.fetch_mock_data("SOJA"))