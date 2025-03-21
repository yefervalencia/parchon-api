import Router from "express";
import {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByCookie,
  getCookieExists,
  getRoleByCookie,
  loginAdmin,
  logoutAdmin
} from "../controllers/Admins.controller";

const adminRoutes = Router();

adminRoutes.post("/", createAdmin)
adminRoutes.get("/", getAdmins)
adminRoutes.get("/:id", getAdmin)
adminRoutes.put("/:id", updateAdmin)
adminRoutes.delete("/:id", deleteAdmin)
adminRoutes.get("/cookie", getCookieExists)
adminRoutes.post("/cookie", getAdminByCookie)
adminRoutes.get("/role", getRoleByCookie)
adminRoutes.post("/login", loginAdmin)
adminRoutes.post("/logout", logoutAdmin)

export default adminRoutes;