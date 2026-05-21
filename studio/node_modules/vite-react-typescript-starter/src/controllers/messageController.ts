// messageController.ts
// Controlador de mensajes para el frontend de Ferradas Automotores.
// Define la función sendMessage para enviar mensajes de contacto al backend.
// Utiliza fetch para enviar solicitudes HTTP y maneja respuestas y errores.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function sendMessage({ nombre, email, telefono, mensaje }: { nombre: string; email: string; telefono: string; mensaje: string }) {
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