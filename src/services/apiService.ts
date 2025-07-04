// Servicio para interactuar con la API del backend

const API_URL = 'http://localhost:4000/api';

// Envía un mensaje de contacto al backend
export const sendContactMessage = async ({ nombre, email, telefono, mensaje }: { nombre: string, email: string, telefono: string, mensaje: string }) => {
  const res = await fetch(`${API_URL}/mensajes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ nombre, email, telefono, mensaje })
  });
  if (!res.ok) throw new Error('Error al enviar el mensaje');
  return res.json();
};

// Login de usuario
export const loginAPI = async ({ email, password }: { email: string, password: string }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Error en el login');
  return res.json();
};

// Registro de usuario
export const registerAPI = async ({ username, email, password }: { username: string, email: string, password: string }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, email, password })
  });
  if (!res.ok) throw new Error('Error en el registro');
  return res.json();
};

// Verifica si hay sesión activa
export const getSession = async () => {
  const res = await fetch(`${API_URL}/auth/session`, {
    credentials: 'include',
  });
  if (!res.ok) return { authenticated: false };
  return res.json();
}; 