// src/controllers/notifications.controller.ts
import { RequestHandler } from 'express';
import { PushToken } from '../entities/PushToken';  

export const registerPushToken: RequestHandler = async (req, res) => {
  const userId = req.user.id;      
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: 'Token es requerido' });
    res.end();
  }

  let record = await PushToken.findOneBy({ userId, token });
  if (!record) {
    record = new PushToken();
    record.userId = userId;
    record.token = token;
    await record.save();
  }
  res.status(201).json({ message: 'Registrado exitosamente' });
  res.end();
  res.status(201).json({ message: 'Registrado exitosamente' });
};
