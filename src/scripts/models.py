from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class CommodityPrice(Base):
    __tablename__ = 'commodity_prices'

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, nullable=False)  # Ex: "SOJA", "MILHO"
    price = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    source = Column(String)  # De onde veio o dado (ex: "B3", "Yahoo Finance")

    def __repr__(self):
        return f"<CommodityPrice(symbol='{self.symbol}', price={self.price})>"