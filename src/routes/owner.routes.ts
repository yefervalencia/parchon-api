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

const ownerRoutes = Router();

ownerRoutes.post("/", createOwner)
ownerRoutes.get("/", getOwners)
ownerRoutes.get("/:id", getOwner)
ownerRoutes.put("/:id", updateOwner)
ownerRoutes.delete("/:id", deleteOwner)
ownerRoutes.get("/cookie", getCookieExists)
ownerRoutes.post("/cookie", getOwnerByCookie)
ownerRoutes.get("/role", getRoleByCookie)
ownerRoutes.post("/login", loginOwner)
ownerRoutes.post("/logout", logoutOwner)



export default ownerRoutes;