import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  checkAuth,
  getCurrentRole,
  updateProfile,
  changePassword,
} from "../controllers/Auth.controller";

const authRouter = Router();

// Rutas de autenticación
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", getCurrentUser);
authRouter.get("/check-auth", checkAuth);
authRouter.get("/role", getCurrentRole);
authRouter.put("/profile", updateProfile);
authRouter.post("/change-password", changePassword);




export default authRouter;