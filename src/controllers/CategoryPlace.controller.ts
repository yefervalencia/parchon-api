import { RequestHandler } from "express";
import { CategoriesPlaces } from "../entities/CategoriesPlaces";

// Crear una nueva categoría de lugar
export const createCategoryPlace: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryPlace = new CategoriesPlaces();
    categoryPlace.name = name;

    await categoryPlace.save();

    res.status(201).json(categoryPlace);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las categorías de lugares
export const getCategoriesPlaces: RequestHandler = async (req, res) => {
  try {
    const categoriesPlaces = await CategoriesPlaces.find();
    res.json(categoriesPlaces);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una categoría de lugar por ID
export const getCategoryPlace: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryPlace = await CategoriesPlaces.findOneBy({ id: parseInt(id) });

    if (!categoryPlace) {
      res.status(404).json({ message: "Category Place not found" });
    }

    res.json(categoryPlace);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una categoría de lugar
export const updateCategoryPlace: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryPlace = await CategoriesPlaces.findOneBy({ id: parseInt(id) });

    if (!categoryPlace) {
      res.status(404).json({ message: "Category Place not found" });
    }

    await CategoriesPlaces.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una categoría de lugar
export const deleteCategoryPlace: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CategoriesPlaces.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Category Place not found" });
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