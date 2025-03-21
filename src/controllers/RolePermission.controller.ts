import { RequestHandler } from "express";
import { RolePermission } from "../entities/RolePermission";
import { Roles } from "../entities/Roles";
import { Permissions } from "../entities/Permissions";

// Asignar un permiso a un rol
export const assignPermissionToRole: RequestHandler = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    // Verificar si el rol y el permiso existen
    const role = await Roles.findOneBy({ id: roleId });
    const permission = await Permissions.findOneBy({ id: permissionId });

    if (!role || !permission) {
      res.status(404).json({ message: "Role or Permission not found" });
    }

    // Crear la relación entre el rol y el permiso
    const rolePermission = new RolePermission();
    rolePermission.roleId = roleId;
    rolePermission.permissionId = permissionId;

    await rolePermission.save();

    res.status(201).json(rolePermission);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los permisos de un rol
export const getPermissionsByRole: RequestHandler = async (req, res) => {
  try {
    const { roleId } = req.params;

    const rolePermissions = await RolePermission.find({
      where: { roleId: parseInt(roleId) },
      relations: ["permission"], // Incluir la entidad Permission
    });

    // Extraer los permisos de la relación
    const permissions = rolePermissions.map((rp) => rp.permission);

    res.json(permissions);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un permiso de un rol
export const removePermissionFromRole: RequestHandler = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;

    const result = await RolePermission.delete({
      roleId: parseInt(roleId),
      permissionId: parseInt(permissionId),
    });

    if (result.affected === 0) {
      res.status(404).json({ message: "RolePermission not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};