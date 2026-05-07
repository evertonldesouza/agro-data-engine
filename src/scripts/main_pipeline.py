from database import SessionLocal
from models import CommodityPrice
from collector import CommodityCollector

def run_pipeline():
    # 1. Inicia o coletor e a sessão do banco
    collector = CommodityCollector()
    db = SessionLocal()
    
    print("🚀 Iniciando Pipeline de Dados...")

    try:
        # 2. Extração (Extract)
        # Vamos buscar dados para Soja e Milho
        for symbol in ["SOJA", "MILHO"]:
            raw_data = collector.fetch_mock_data(symbol)
            
            # 3. Transformação (Transform) 
            # Aqui convertemos o dicionário Python para o nosso Modelo do SQLAlchemy
            new_price = CommodityPrice(
                symbol=raw_data['symbol'],
                price=raw_data['price'],
                timestamp=raw_data['timestamp'],
                source=raw_data['source']
            )
            
            # 4. Carga (Load)
            db.add(new_price)
            print(f"💾 {symbol} preparado para salvar...")

        # Commita as alterações no banco de dados
        db.commit()
        print("✅ Dados salvos com sucesso no PostgreSQL!")

    except Exception as e:
        print(f"❌ Erro no pipeline: {e}")
        db.rollback() # Desfaz alterações se der erro
    finally:
        db.close()

if __name__ == "__main__":
    run_pipeline()