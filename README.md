🐉 Monster Hunter Builds API (WIP)
A full‑stack application that allows users to create, store, and browse Monster Hunter weapon builds, including attack stats, elemental focus, and recommended monsters.
The project also includes a complete monster database with each monster’s element and weakness, enabling players to match builds to the monsters they perform best against.

This project includes:

A FastAPI backend for data storage and CRUD operations

A React frontend for browsing, filtering, and managing builds

A clean, extensible architecture designed for future expansion

🚀 Features
Build Management (Full CRUD)
Create new builds

View all builds

Edit existing builds

Delete builds

Link builds to specific monsters

Each build includes:

name

attack

element_focus

monster_id (optional)

Monster Database
List all monsters

View monster element + weakness

Used for filtering builds

Used for showing monster icons in the UI

Sorting & Filtering (Frontend Powered)
The React frontend provides advanced sorting and filtering:

Sorting
Name (A–Z)

Attack (High → Low)

Element (A–Z)

Filtering
By element (Fire, Water, Thunder, Ice, Dragon)

By monster (via monster_id)

Combined Pipeline
Sorting and filtering are applied together:

Code
processedBuilds = sortBuilds(
  filterByMonster(
    filterByElement(builds)
  )
)
React Frontend
Build creation form

Inline editing

Monster + element icons

Live updates after CRUD actions

Clean, simple UI

🛠️ Tech Stack
Backend
Python

FastAPI

SQLite (local development)

Pydantic models

Uvicorn

Frontend
React

JavaScript

CSS Modules / Styled Components

📦 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/Jared-Stoute/game_data_api.git
cd game_data_api
🔧 Backend Setup
2. Create and activate a virtual environment
bash
python -m venv venv
venv\Scripts\activate
3. Install dependencies
bash
pip install -r requirements.txt
4. Run the API
bash
uvicorn main:app --reload
API will be available at:

Code
http://127.0.0.1:8000
Interactive docs:

Code
http://127.0.0.1:8000/docs
🎨 Frontend Setup
1. Navigate to the frontend folder
bash
cd frontend
2. Install dependencies
bash
npm install
3. Start the development server
bash
npm start
Frontend will run on:

Code
http://localhost:3000
🧭 Endpoints Overview
Monsters
GET /monsters — List all monsters

GET /monsters/{id} — Get a monster by ID

POST /monsters — Add a new monster

Builds
GET /builds — List all builds

GET /builds/{id} — Get a build by ID

POST /builds — Create a new build

PUT /builds/{id} — Update a build

DELETE /builds/{id} — Delete a build

🗺️ Roadmap
Planned features and improvements:

🧩 Armor sets and skill data

⚔️ Weapon type metadata

📊 Damage calculation helpers

🔍 Search builds by element or monster

🐲 Add Monster Hunter Wilds monsters

🗃️ PostgreSQL migration

🔐 User accounts and authentication

🎨 Full React UI for builds + monsters

📱 Mobile‑friendly responsive layout

📌 Status
This project is currently a Work in Progress (WIP).
Core CRUD features are implemented, and the frontend is actively expanding to support more Monster Hunter data.

🤝 Contributions
This is a personal project, but suggestions and feedback are welcome.

📄 License
To be added.