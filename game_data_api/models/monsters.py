from sqlmodel import SQLModel, Field

class Monsters(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    element: str
    weakness: str | None = Field(default=None)