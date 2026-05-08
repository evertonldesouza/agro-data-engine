import requests
import random
from datetime import datetime

class CommodityCollector:
    def __init__(self):
        self.api_url = "https://api.exemplo.com/v1/commodities"

    def fetch_mock_data(self, symbol):

        base_price = 135.0 if symbol == "SOJA" else 58.0
        variation = random.uniform(-1.5, 1.5)
        

        data = {
            "symbol": symbol,
            "price": round(base_price + variation, 2),
            "timestamp": datetime.utcnow(),
            "source": "Simulated Market Data"
        }
        return data


if __name__ == "__main__":
    collector = CommodityCollector()
    print("--- Teste Isolado do Coletor ---")
    print(collector.fetch_mock_data("SOJA"))