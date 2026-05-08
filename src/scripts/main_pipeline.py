from database import SessionLocal
from models import CommodityPrice
from collector import CommodityCollector

def run_pipeline():
    collector = CommodityCollector()
    db = SessionLocal()
    
    print("🚀 Iniciando Pipeline de Dados...")

    try:

        for symbol in ["SOJA", "MILHO"]:
            raw_data = collector.fetch_mock_data(symbol)
            

            new_price = CommodityPrice(
                symbol=raw_data['symbol'],
                price=raw_data['price'],
                timestamp=raw_data['timestamp'],
                source=raw_data['source']
            )
            
            db.add(new_price)
            print(f"💾 {symbol} preparado para salvar...")

        db.commit()
        print("✅ Dados salvos com sucesso no PostgreSQL!")

    except Exception as e:
        print(f"❌ Erro no pipeline: {e}")
        db.rollback() 
    finally:
        db.close()

if __name__ == "__main__":
    run_pipeline()