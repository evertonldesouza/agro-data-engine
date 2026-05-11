import pandas as pd
from database import SessionLocal
from models import CommodityPrice

def calculate_trends():
    db = SessionLocal()
    print("📊 Analisando tendências no Supabase...")

    try:
        query = db.query(CommodityPrice).all()
        
        df = pd.DataFrame([
            {'symbol': p.Symbol, 'price': p.Price, 'timestamp': p.Timestamp} 
            for p in query
        ])

        if df.empty:
            print("⚠️ Sem dados no Supabase para análise.")
            return

        for symbol in df['symbol'].unique():
            symbol_df = df[df['symbol'] == symbol].sort_values(by='timestamp')
            symbol_df['moving_avg'] = symbol_df['price'].rolling(window=3).mean()
            
            latest = symbol_df.iloc[-1]
            
            print(f"\n--- {symbol} ---")
            print(f"Atual: R$ {latest['price']} | Média: R$ {latest['moving_avg']:.2f}")
            
            if latest['price'] > latest['moving_avg']:
                print("📈 Tendência: ALTA")
            else:
                print("📉 Tendência: BAIXA")

    except Exception as e:
        print(f"❌ Erro: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    calculate_trends()