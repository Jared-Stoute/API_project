import React, { useEffect, useState } from "react";
import BuildForm from "../components/BuildForm";
import { getBuilds, createBuild, deleteBuild, updateBuild } from "../api/builds";
import { ELEMENT_ICONS } from "../data/elementIcons";


export default function BuildsPage() {
  const [builds, setBuilds] = useState([]);
  const [editing, setEditing] = useState(null);

  // Sorting + filtering state
  const [sortBy, setSortBy] = useState("name");
  const [filterElement, setFilterElement] = useState("all");
  const [filterMonster, setFilterMonster] = useState("all");

  // Monsters list for filtering + name lookup
  const [monsters, setMonsters] = useState([]);

  // Load builds
  async function loadBuilds() {
    const data = await getBuilds();
    setBuilds(data);
  }

  // Load monsters
  async function loadMonsters() {
    const res = await fetch("http://127.0.0.1:8000/monsters");
    const data = await res.json();
    setMonsters(data);
  }

  useEffect(() => {
    loadBuilds();
    loadMonsters();
  }, []);

  // CRUD handlers
  async function handleCreate(buildData) {
    await createBuild(buildData);
    loadBuilds();
  }

  async function handleDelete(id) {
    await deleteBuild(id);
    loadBuilds();
  }

  async function handleUpdate(id, buildData) {
    await updateBuild(id, buildData);
    setEditing(null);
    loadBuilds();
  }

  // Sorting
  function sortBuilds(builds) {
    const sorted = [...builds];

    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "attack") {
      sorted.sort((a, b) => b.attack - a.attack);
    } else if (sortBy === "element") {
      sorted.sort((a, b) => a.element_focus.localeCompare(b.element_focus));
    }

    return sorted;
  }

  // Filter by element
  function filterByElement(builds) {
    if (filterElement === "all") return builds;
    return builds.filter(
      (b) => b.element_focus.toLowerCase() === filterElement.toLowerCase()
    );
  }

  // Filter by monster
  function filterByMonster(builds) {
    if (filterMonster === "all") return builds;
    return builds.filter((b) => b.monster_id === Number(filterMonster));
  }

  // Get monster name from ID
  function getMonsterName(id) {
    const m = monsters.find((m) => m.id === id);
    return m ? m.name : "Unknown Monster";
  }

  // Apply filters + sorting
  const processedBuilds = sortBuilds(
    filterByMonster(filterByElement(builds))
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Builds</h1>

      {/* Sorting */}
      <label>
        Sort by:{" "}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name (A–Z)</option>
          <option value="attack">Attack (High → Low)</option>
          <option value="element">Element (A–Z)</option>
        </select>
      </label>

      {/* Element filter */}
      <label style={{ marginLeft: "1rem" }}>
        Filter by element:{" "}
        <select
          value={filterElement}
          onChange={(e) => setFilterElement(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Thunder">Thunder</option>
          <option value="Ice">Ice</option>
          <option value="Dragon">Dragon</option>
        </select>
      </label>

      {/* Monster filter */}
      <label style={{ marginLeft: "1rem" }}>
        Filter by monster:{" "}
        <select
          value={filterMonster}
          onChange={(e) => setFilterMonster(e.target.value)}
        >
          <option value="all">All</option>
          {monsters.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>

      <h2>Create New Build</h2>
      <BuildForm onSubmit={handleCreate} />

      <h2>All Builds</h2>
      <ul>
        {processedBuilds.map((b) => (
          <li key={b.id} style={{ marginBottom: "1rem" }}>
            {editing === b.id ? (
              <BuildForm
                onSubmit={(data) => handleUpdate(b.id, data)}
                initial={b}
              />
            ) : (
              <>
                <strong>{b.name}</strong> — {b.element_focus} — {b.attack}
                {b.monster_id && (
                  <div>
                    Monster:{" "}
                    <img
                      src={ELEMENT_ICONS[
                        monsters.find(m => m.id === b.monster_id)?.element
                      ]}
                      alt={monsters.find(m => m.id === b.monster_id)?.element}
                      className="monster-icon"
                    />
                    {getMonsterName(b.monster_id)}
                  </div>
                )}
                <br />
                <button onClick={() => setEditing(b.id)}>Edit</button>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}