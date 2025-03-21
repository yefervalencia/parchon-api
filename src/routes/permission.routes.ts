import Router from "express";
import {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
} from "../controllers/Permission.controller";

const permissionRoutes = Router();

permissionRoutes.post("/", createPermission);
permissionRoutes.get("/", getPermissions);
permissionRoutes.get("/:id", getPermission);
permissionRoutes.put("/:id", updatePermission);
permissionRoutes.delete("/:id", deletePermission);

export default permissionRoutes;