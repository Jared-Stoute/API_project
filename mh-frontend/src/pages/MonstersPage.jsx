import { useState, useEffect } from "react";
import MonsterForm from "../components/MonsterForm";
import { ELEMENT_ICONS } from "../data/elementIcons";

export default function MonstersPage() {
  const [monsters, setMonsters] = useState([]);
  const [editingMonster, setEditingMonster] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMonsters();
  }, []);

  function loadMonsters() {
    fetch("http://127.0.0.1:8000/monsters/")
      .then(res => res.json())
      .then(data => setMonsters(data));
  }

  function handleCreate(data) {
    fetch("http://127.0.0.1:8000/monsters/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      loadMonsters();
      setShowForm(false);
    });
  }

  function handleUpdate(data) {
    fetch(`http://127.0.0.1:8000/monsters/${editingMonster.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      loadMonsters();
      setEditingMonster(null);
      setShowForm(false);
    });
  }

  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/monsters/${id}`, {
      method: "DELETE"
    }).then(() => loadMonsters());
  }

  return (
    <div className="monsters-page">
      <h1>Monsters</h1>

      <button
        onClick={() => {
          setEditingMonster(null);
          setShowForm(true);
        }}
      >
        Add Monster
      </button>

      {showForm && (
        <MonsterForm
          monster={editingMonster}
          onSubmit={editingMonster ? handleUpdate : handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul className="monster-list">
        {monsters.map(m => (
          <li key={m.id} className="monster-item">
            <img
              src={ELEMENT_ICONS[m.element]}
              alt={m.element}
              className="monster-icon"
            />
            <strong>{m.name}</strong> — {m.element}

            {m.weakness && (
              <>
                {" "} | Weakness:{" "}
                <img
                  src={ELEMENT_ICONS[m.weakness]}
                  alt={m.weakness}
                  className="monster-icon"
                />
                {m.weakness}
              </>
            )}

            <button
              onClick={() => {
                setEditingMonster(m);
                setShowForm(true);
              }}
            >
              Edit
            </button>

            <button onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}