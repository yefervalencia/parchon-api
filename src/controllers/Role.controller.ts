import { RequestHandler } from "express";
import { Roles } from "../entities/Roles";

// Crear un nuevo rol
export const createRole: RequestHandler = async (req, res) => {
  try {
    const { name, description } = req.body;

    const role = new Roles();
    role.name = name;
    role.description = description;

    await role.save();

    res.status(201).json(role);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los roles
export const getRoles: RequestHandler = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.json(roles);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un rol por ID
export const getRole: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Roles.findOneBy({ id: parseInt(id) });

    if (!role) {
      res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un rol
export const updateRole: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Roles.findOneBy({ id: parseInt(id) });

    if (!role) {
      res.status(404).json({ message: "Role not found" });
    }

    await Roles.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un rol
export const deleteRole: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Roles.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Role not found" });
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