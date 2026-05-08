import pandas as pd
from sqlalchemy import func
from database import SessionLocal
from models import CommodityPrice

def calculate_trends():
    db = SessionLocal()
    print("📊 Iniciando análise de tendências...")

    try:
        query = db.query(CommodityPrice).all()
        
        df = pd.DataFrame([
            {'symbol': p.symbol, 'price': p.price, 'timestamp': p.timestamp} 
            for p in query
        ])

        if df.empty:
            print("⚠️ Sem dados suficientes para análise.")
            return

        for symbol in df['symbol'].unique():
            symbol_df = df[df['symbol'] == symbol].sort_values(by='timestamp')
            
            symbol_df['moving_avg'] = symbol_df['price'].rolling(window=3).mean()
            
            latest = symbol_df.iloc[-1]
            
            print(f"\n--- Relatório: {symbol} ---")
            print(f"Preço Atual: R$ {latest['price']}")
            print(f"Média Móvel (3 per): R$ {latest['moving_avg']:.2f}")
            
            if latest['price'] > latest['moving_avg']:
                print("📈 Tendência: ALTA (Preço acima da média)")
            elif latest['price'] < latest['moving_avg']:
                print("📉 Tendência: BAIXA (Preço abaixo da média)")
            else:
                print("➡️ Tendência: ESTÁVEL")

    except Exception as e:
        print(f"❌ Erro na análise: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    calculate_trends()