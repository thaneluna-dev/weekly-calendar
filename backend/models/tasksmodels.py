from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Enum, Date
from backend.routes.storage import engine as storage_engine

Base = declarative_base()

class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    taskdate = Column(Date, nullable=False)
    dateindex = Column(Integer, nullable=False)
    
Base.metadata.create_all(bind=storage_engine)