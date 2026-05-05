from sqlmodel import SQLModel, create_engine

DATABASE_URL = "sqlite:///./game_data.db"

engine = create_engine(DATABASE_URL, echo=True)