const API_URL = "https://dailyforge-backend.onrender.com/api/auth";

// 1. Log the user in and return token + user data
export async function loginUser(credentials: any) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json(); 
}

// 2. Fetch profile data securely ONLY if a token exists
export async function fetchCurrentUser() {
  const token = localStorage.getItem("auth_token");
  
  // 🛑 THE BUG FIX: If no token exists, do not hit the backend!
  if (!token) {
    return null; 
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    return null;
  }

  return response.json();
}