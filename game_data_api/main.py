from fastapi import FastAPI
from database import init_db
from fastapi.middleware.cors import CORSMiddleware
from routes.monsters import router as monsters_router
from routes.builds import router as builds_router

app = FastAPI(title="Game Data API", version="0.1.0")

init_db()

app.include_router(monsters_router)
app.include_router(builds_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Game Data API!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
