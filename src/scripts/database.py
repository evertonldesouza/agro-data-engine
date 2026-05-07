import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# No futuro, buscaremos isso de variáveis de ambiente (.env)
DATABASE_URL = "postgresql://admin:mysecretpassword@localhost:5432/agro_data_engine"

# O 'engine' é o motor que mantém a conexão com o banco
engine = create_engine(DATABASE_URL)

# A 'Session' é o que usaremos para abrir e fechar conversas com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# A 'Base' é de onde nossas tabelas (modelos) vão herdar
Base = declarative_base()

def get_db():
    """Retorna uma nova sessão de banco de dados"""
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

print("🚀 Database module initialized successfully!")