from fastapi import APIRouter, HTTPException, Body, Query
from sqlmodel import Session, select
from database import engine
from models.monsters import Monsters
from schemas.monsters import Monster
from typing import List, Optional

router = APIRouter(prefix="/monsters", tags=["Monsters"])


# GET ALL
@router.get("/", response_model=List[Monster])
def list_monsters():
    with Session(engine) as session:
        return session.exec(select(Monsters)).all()


# CREATE
@router.post("/", response_model=Monster)
def create_monster(monster: Monster):
    with Session(engine) as session:
        db_monster = Monsters(**monster.dict())
        session.add(db_monster)
        session.commit()
        session.refresh(db_monster)
        return db_monster


# BULK CREATE
@router.post("/bulk", response_model=List[Monster])
def create_monsters_bulk(monsters: List[Monster]):
    with Session(engine) as session:
        db_monsters = []

        for monster in monsters:
            db_monster = Monsters(**monster.dict())
            session.add(db_monster)
            db_monsters.append(db_monster)

        session.commit()

        for m in db_monsters:
            session.refresh(m)

        return db_monsters


# DELETE
@router.delete("/{monster_id}")
def delete_monster(monster_id: int):
    with Session(engine) as session:
        monster = session.get(Monsters, monster_id)
        if not monster:
            raise HTTPException(status_code=404, detail="Monster not found")

        session.delete(monster)
        session.commit()
        return {"message": f"Monster {monster_id} deleted"}


# FULL UPDATE (PUT)
@router.put("/{monster_id}", response_model=Monster)
def update_monster(monster_id: int, monster: Monster):
    with Session(engine) as session:
        db_monster = session.get(Monsters, monster_id)
        if not db_monster:
            raise HTTPException(status_code=404, detail="Monster not found")

        db_monster.name = monster.name
        db_monster.element = monster.element
        db_monster.weakness = monster.weakness  # <-- FIXED

        session.add(db_monster)
        session.commit()
        session.refresh(db_monster)

        return db_monster


# PARTIAL UPDATE (PATCH)
@router.patch("/{monster_id}", response_model=Monster)
def patch_monster(
    monster_id: int,
    name: Optional[str] = Body(None),
    element: Optional[str] = Body(None),
    weakness: Optional[str] = Body(None)
):
    with Session(engine) as session:
        db_monster = session.get(Monsters, monster_id)
        if not db_monster:
            raise HTTPException(status_code=404, detail="Monster not found")

        if name is not None:
            db_monster.name = name
        if element is not None:
            db_monster.element = element
        if weakness is not None:
            db_monster.weakness = weakness

        session.add(db_monster)
        session.commit()
        session.refresh(db_monster)

        return db_monster


# SEARCH
@router.get("/search", response_model=List[Monster])
def search_monsters(query: str = Query(...)):
    with Session(engine) as session:
        statement = (
            select(Monsters)
            .where(
                (Monsters.name.ilike(f"%{query}%")) |
                (Monsters.element.ilike(f"%{query}%")) |
                (Monsters.weakness.ilike(f"%{query}%"))
            )
        )
        return session.exec(statement).all()