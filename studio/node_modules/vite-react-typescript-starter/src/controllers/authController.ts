// authController.ts
// Controlador de autenticación para el frontend de Ferradas Automotores.
// Define funciones para login y registro de usuarios, comunicándose con la API backend.
// Utiliza fetch para enviar solicitudes HTTP y maneja respuestas y errores.

// [NO USADO] Este archivo no está siendo importado ni utilizado actualmente en las vistas.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function loginUser({ email, password }: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Credenciales incorrectas o error de red");
  }
  return response.json();
}

export async function registerUser({ username, email, password }: { username: string; email: string; password: string }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }
  return response.json();
} 