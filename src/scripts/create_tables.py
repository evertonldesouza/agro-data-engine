from database import engine, Base
from models import CommodityPrice

def init_db():
    print("Creating tables in database...")
    # Isso aqui lê todos os modelos que herdam de 'Base' e cria no banco
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

if __name__ == "__main__":
    init_db()