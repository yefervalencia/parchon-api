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

const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/cookie", getUserByCookie);
userRoutes.post("/role", getRoleByCookie);
userRoutes.get("/role", getRoleByCookie);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUser);
userRoutes.get("/cookie", getCookieExists);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
