import { RequestHandler } from "express";
import { Permissions } from "../entities/Permissions";

// Crear un nuevo permiso
export const createPermission: RequestHandler = async (req, res) => {
  try {
    const { name, description, route } = req.body;

    const permission = new Permissions();
    permission.name = name;
    permission.description = description;
    permission.route = route;

    await permission.save();

    res.status(201).json(permission);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los permisos
export const getPermissions: RequestHandler = async (req, res) => {
  try {
    const permissions = await Permissions.find();
    res.json(permissions);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un permiso por ID
export const getPermission: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permissions.findOneBy({ id: parseInt(id) });

    if (!permission) {
      res.status(404).json({ message: "Permission not found" });
    }

    res.json(permission);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un permiso
export const updatePermission: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const permission = await Permissions.findOneBy({ id: parseInt(id) });

    if (!permission) {
      res.status(404).json({ message: "Permission not found" });
    }

    await Permissions.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un permiso
export const deletePermission: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Permissions.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Permission not found" });
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