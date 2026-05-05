from pydantic import BaseModel

class BuildCreate(BaseModel):
    name: str
    element_focus: str
    attack: int
    monster_id: int | None = None


class BuildRead(BaseModel):
    id: int
    name: str
    element_focus: str
    attack: int
    monster_id: int | None

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "name": "Thunder Crusher",
                "element_focus": "Thunder",
                "attack": 180
            }
        }
    }