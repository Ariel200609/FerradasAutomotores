import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/messageController';

const router = Router();

// Crear mensaje
router.post('/', createMessage);

// Listar mensajes del usuario autenticado
router.get('/', getMessages);

export default router; 