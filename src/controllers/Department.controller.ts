import { RequestHandler } from "express";
import { Departments } from "../entities/Departments";
import { Cities } from "../entities/Cities";


// Crear un nuevo departamento
export const createDepartment: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const department = new Departments();
    department.name = name;

    await department.save();

    res.status(201).json(department);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los departamentos
export const getDepartments: RequestHandler = async (req, res) => {
  try {
    const departments = await Departments.find();
    res.json(departments);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un departamento por ID
export const getDepartment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Departments.findOneBy({ id: parseInt(id) });

    if (!department) {
      res.status(404).json({ message: "Department not found" });
    }

    res.json(department);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un departamento
export const updateDepartment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Departments.findOneBy({ id: parseInt(id) });

    if (!department) {
      res.status(404).json({ message: "Department not found" });
    }

    await Departments.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un departamento
export const deleteDepartment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Departments.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Department not found" });
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

// Obtener las ciudades de un departamento específico
export const getCitiesByDepartment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el departamento existe
    const department = await Departments.findOneBy({ id: parseInt(id) });
    if (!department) {
      res.status(404).json({ message: "Department not found" });
    }

    // Obtener las ciudades donde department_id coincide con el ID del departamento
    const cities = await Cities.find({
      where: { departmentId: parseInt(id) },
    });

    res.json(cities);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};