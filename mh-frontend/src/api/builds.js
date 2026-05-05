const API_URL = "http://127.0.0.1:8000";

export async function createBuild(buildData) {
  const res = await fetch(`${API_URL}/builds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildData)
  });

  if (!res.ok) {
    throw new Error("Failed to create build");
  }

  return res.json();
}

export async function getBuilds() {
  const res = await fetch(`${API_URL}/builds`);
  if (!res.ok) throw new Error("Failed to fetch builds");
  return res.json();
}

export async function deleteBuild(id) {
  const res = await fetch(`${API_URL}/builds/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete build");
}

export async function updateBuild(id, data) {
  const res = await fetch(`${API_URL}/builds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update build");
  return res.json();
}