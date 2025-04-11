import { RequestHandler } from "express";
import { CategoriesServices } from "../entities/CategoriesServices";
import { Services } from "../entities/Services";
// Crear una nueva categoría de servicio
export const createCategoryService: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryService = new CategoriesServices();
    categoryService.name = name;

    await categoryService.save();

    res.status(201).json(categoryService);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las categorías de servicios
export const getCategoriesServices: RequestHandler = async (req, res) => {
  try {
    const categoriesServices = await CategoriesServices.find();
    res.json(categoriesServices);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una categoría de servicio por ID
export const getCategoryService: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryService = await CategoriesServices.findOneBy({ id: parseInt(id) });

    if (!categoryService) {
      res.status(404).json({ message: "Category Service not found" });
    }

    res.json(categoryService);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una categoría de servicio
export const updateCategoryService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryService = await CategoriesServices.findOneBy({ id: parseInt(id) });

    if (!categoryService) {
      res.status(404).json({ message: "Category Service not found" });
    }

    await CategoriesServices.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una categoría de servicio
export const deleteCategoryService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CategoriesServices.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Category Service not found" });
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

export const getServicesByCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoriesServices.findOneBy({ id: parseInt(id) });
    if (!category) {
      res.status(404).json({ message: "category not found" });
    }

    const services = await Services.find({
      where: { categoryServiceId: parseInt(id) },
    });

    res.json(services);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};