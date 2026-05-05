const API_URL = "http://127.0.0.1:8000";

export async function getMonsters() {
  const res = await fetch(`${API_URL}/monsters`);
  return res.json();
}

export async function searchMonsters(query) {
  const res = await fetch(`${API_URL}/monsters/search?query=${query}`);
  return res.json();
}