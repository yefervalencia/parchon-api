import Router from "express";
import {
  assignPermissionToRole,
  getPermissionsByRole,
  removePermissionFromRole,
} from "../controllers/RolePermission.controller";

const rolePermissionRoutes = Router();

rolePermissionRoutes.post("/", assignPermissionToRole); // Asignar permiso a un rol
rolePermissionRoutes.get("/:roleId/permissions", getPermissionsByRole); // Obtener permisos de un rol
rolePermissionRoutes.delete("/:roleId/permissions/:permissionId", removePermissionFromRole); // Eliminar permiso de un rol

export default rolePermissionRoutes;