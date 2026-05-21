// apiService.ts
// Servicio de utilidades para llamadas HTTP a la API backend de Ferradas Automotores.
// Define funciones genéricas para login, registro y envío de mensajes de contacto.
// [NO USADO] Actualmente no es utilizado directamente, ya que los controladores usan fetch inline.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function loginAPI({ email, password }: { email: string; password: string }) {
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

export async function registerAPI({ username, email, password }: { username: string; email: string; password: string }) {
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

export async function sendContactMessage({ nombre, email, telefono, mensaje }: { nombre: string; email: string; telefono: string; mensaje: string }) {
  const response = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, telefono, mensaje }),
  });
  if (!response.ok) {
    throw new Error("Error al enviar el mensaje");
  }
  return response.json();
} 