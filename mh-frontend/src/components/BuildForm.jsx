import React, { useState, useEffect } from "react";

export default function BuildForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [element_focus, setElementFocus] = useState(initial?.element_focus || "");
  const [attack, setAttack] = useState(initial?.attack || "");

  // Monster selection
  const [monster_id, setMonsterId] = useState(initial?.monster_id || "");

  // List of monsters
  const [monsters, setMonsters] = useState([]);

  // Load monsters once when the form mounts
  useEffect(() => {
    async function loadMonsters() {
      const res = await fetch("http://127.0.0.1:8000/monsters");
      const data = await res.json();
      setMonsters(data);
    }
    loadMonsters();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name,
      element_focus,
      attack: Number(attack),
      monster_id: monster_id ? Number(monster_id) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "300px" }}>
      <input
        type="text"
        placeholder="Build Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Element Focus"
        value={element_focus}
        onChange={(e) => setElementFocus(e.target.value)}
      />

      <input
        type="number"
        placeholder="Attack"
        value={attack}
        onChange={(e) => setAttack(e.target.value)}
      />

      {/* Monster dropdown */}
      <select value={monster_id} onChange={(e) => setMonsterId(e.target.value)}>
        <option value="">Select Monster</option>
        {monsters.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <button type="submit">{initial ? "Update Build" : "Create Build"}</button>
    </form>
  );
}