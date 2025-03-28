import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error no controlado:', err.stack);
  res.status(500).json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'Ocurrió un error inesperado'
  });
};