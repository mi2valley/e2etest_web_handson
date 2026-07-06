import userData from "@/data/user.json";

export function login(email: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  if (email === userData.email && password === userData.password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userData.id);
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
}
