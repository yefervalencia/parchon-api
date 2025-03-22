import Router from "express";
import {
  createOwner,
  getOwners,
  getOwner,
  updateOwner,
  deleteOwner,
  getCookieExists,
  getOwnerByCookie,
  getRoleByCookie,
  loginOwner,
  logoutOwner,
} from "../controllers/Owner.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const ownerRoutes = Router();

ownerRoutes.post("/", createOwner);
ownerRoutes.get("/", authMiddleware, roleMiddleware(["Admin", "Owner"]), getOwners);
ownerRoutes.get("/:id", authMiddleware, getOwner);
ownerRoutes.put("/:id", authMiddleware, roleMiddleware(["Owner"]), updateOwner);
ownerRoutes.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deleteOwner);
ownerRoutes.get("/cookie", getCookieExists)
ownerRoutes.post("/cookie", getOwnerByCookie)
ownerRoutes.get("/role", getRoleByCookie)
ownerRoutes.post("/login", loginOwner)
ownerRoutes.post("/logout", logoutOwner)



export default ownerRoutes;