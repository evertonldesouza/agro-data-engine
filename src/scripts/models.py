from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from database import Base

class CommodityPrice(Base):
    __tablename__ = 'Commodities'

    Id = Column(Integer, primary_key=True, autoincrement=True)
    Symbol = Column(String, nullable=False)  
    Price = Column(Float, nullable=False)
    Timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    Source = Column(String)  

    def __repr__(self):
        return f"<Commodity(Symbol='{self.Symbol}', Price={self.Price})>"