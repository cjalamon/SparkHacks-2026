const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchProfile(userId = "me") {
  const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to fetch profile");
  }
  return res.json();
}

export async function updateProfile(userId = "me", data = {}) {
  const res = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to update profile");
  }
  return res.json();
}
