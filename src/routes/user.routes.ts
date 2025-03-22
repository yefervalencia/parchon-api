import { Router } from "express";
import {
  createUser,
  deleteUser,
  getCookieExists,
  getRoleByCookie,
  getUser,
  getUserByCookie,
  getUsers,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/User.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", authMiddleware, roleMiddleware(["Admin"]), getUsers);
userRoutes.get("/:id", authMiddleware, getUser);
userRoutes.put("/:id", authMiddleware, roleMiddleware(["User"]), updateUser);
userRoutes.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deleteUser);
userRoutes.get("/cookie", getCookieExists);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/cookie", getUserByCookie);
userRoutes.post("/role", getRoleByCookie);
userRoutes.get("/role", getRoleByCookie);

export default userRoutes;
