import { sendContactMessage } from '../services/apiService';

// Envía el mensaje del formulario de contacto al backend
export const sendMessage = async ({ nombre, email, telefono, mensaje }: { nombre: string, email: string, telefono: string, mensaje: string }) => {
  // Aquí podrías agregar validaciones adicionales
  return sendContactMessage({ nombre, email, telefono, mensaje });
}; 