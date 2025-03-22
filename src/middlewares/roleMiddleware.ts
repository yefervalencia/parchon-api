import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Insufficient privileges" });
        return;
    }

    next();
  };
};
