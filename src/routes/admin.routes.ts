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
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const adminRoutes = Router();

adminRoutes.post("/", authMiddleware, roleMiddleware(["SuperAdmin"]), createAdmin);
adminRoutes.get("/", authMiddleware, roleMiddleware(["SuperAdmin", "Admin"]), getAdmins);
adminRoutes.get("/:id", authMiddleware, getAdmin);
adminRoutes.put("/:id", authMiddleware, roleMiddleware(["SuperAdmin", "Admin"]), updateAdmin);
adminRoutes.delete("/:id", authMiddleware, roleMiddleware(["SuperAdmin"]), deleteAdmin);
adminRoutes.get("/cookie", getCookieExists)
adminRoutes.post("/cookie", getAdminByCookie)
adminRoutes.get("/role", getRoleByCookie)
adminRoutes.post("/login", loginAdmin)
adminRoutes.post("/logout", logoutAdmin)

export default adminRoutes;