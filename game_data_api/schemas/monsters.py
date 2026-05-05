from pydantic import BaseModel

class Monster(BaseModel):
    id: int
    name: str
    element: str