import { Request, Response, NextFunction } from 'express';
import Message from '../models/message';

// Guardar un nuevo mensaje
export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const userId = req.user && (req.user as any).id;
    if (!userId) return res.status(401).json({ message: 'No autenticado' });
    const message = await Message.create({ content, userId });
    res.status(201).json({ message: 'Mensaje guardado', data: message });
  } catch (err) {
    next(err);
  }
};

// Listar mensajes de un usuario
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user && (req.user as any).id;
    if (!userId) return res.status(401).json({ message: 'No autenticado' });
    const messages = await Message.findAll({ where: { userId } });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}; 