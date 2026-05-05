from fastapi import APIRouter, HTTPException, Body, Query
from sqlmodel import Session, select
from database import engine
from models.builds import Builds
from schemas.builds import BuildCreate, BuildRead
from typing import List, Optional

router = APIRouter(prefix="/builds", tags=["Builds"])


@router.get("/", response_model=list[BuildRead])
def list_builds():
    with Session(engine) as session:
        builds = session.exec(select(Builds)).all()
        return builds


@router.get("/{build_id}", response_model=BuildRead)
def get_build(build_id: int):
    with Session(engine) as session:
        build = session.get(Builds, build_id)

        if not build:
            raise HTTPException(status_code=404, detail="Build not found")

        return build


@router.post("/", response_model=BuildRead)
def create_build(build: BuildCreate):
    with Session(engine) as session:
        new_build = Builds(**build.dict())
        session.add(new_build)
        session.commit()
        session.refresh(new_build)
        return new_build
    
@router.put("/{build_id}", response_model=BuildRead)
def update_build(build_id: int, build: BuildCreate):
    with Session(engine) as session:
        db_build = session.get(Builds, build_id)
        if not db_build:
            raise HTTPException(status_code=404, detail="Build not found")

        db_build.name = build.name
        db_build.element_focus = build.element_focus
        db_build.attack = build.attack

        session.add(db_build)
        session.commit()
        session.refresh(db_build)
        return db_build
    
@router.patch("/{build_id}", response_model=BuildRead)
def patch_build(
    build_id: int,
    name: Optional[str] = Body(None),
    element_focus: Optional[str] = Body(None),
    attack: Optional[int] = Body(None)
):
    with Session(engine) as session:
        db_build = session.get(Builds, build_id)
        if not db_build:
            raise HTTPException(status_code=404, detail="Build not found")

        if name is not None:
            db_build.name = name
        if element_focus is not None:
            db_build.element_focus = element_focus
        if attack is not None:
            db_build.attack = attack

        session.add(db_build)
        session.commit()
        session.refresh(db_build)
        return db_build
    
@router.delete("/{build_id}")
def delete_build(build_id: int):
    with Session(engine) as session:
        build = session.get(Builds, build_id)
        if not build:
            raise HTTPException(status_code=404, detail="Build not found")

        session.delete(build)
        session.commit()
        return {"message": f"Build {build_id} deleted"}