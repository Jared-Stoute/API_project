from sqlmodel import SQLModel, Field

class Builds(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    element_focus: str
    attack: int
    monster_id: int | None = Field(default=None, foreign_key="monsters.id")