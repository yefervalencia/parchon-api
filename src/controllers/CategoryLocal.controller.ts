import { RequestHandler } from "express";
import { CategoriesLocals } from "../entities/CategoriesLocals";
import { Locals } from "../entities/Locals";

// Crear una nueva categoría de local
export const createCategoryLocal: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryLocal = new CategoriesLocals();
    categoryLocal.name = name;

    await categoryLocal.save();

    res.status(201).json(categoryLocal);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las categorías de locales
export const getCategoriesLocals: RequestHandler = async (req, res) => {
  try {
    const categoriesLocals = await CategoriesLocals.find();
    res.json(categoriesLocals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una categoría de local por ID
export const getCategoryLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryLocal = await CategoriesLocals.findOneBy({ id: parseInt(id) });

    if (!categoryLocal) {
      res.status(404).json({ message: "Category Local not found" });
    }

    res.json(categoryLocal);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una categoría de local
export const updateCategoryLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryLocal = await CategoriesLocals.findOneBy({ id: parseInt(id) });

    if (!categoryLocal) {
      res.status(404).json({ message: "Category Local not found" });
    }

    await CategoriesLocals.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una categoría de local
export const deleteCategoryLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CategoriesLocals.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Category Local not found" });
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

export const getLocalsByCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoriesLocals.findOneBy({ id: parseInt(id) });
    if (!category) {
      res.status(404).json({ message: "category not found" });
    }

    const locals = await Locals.find({
      where: { categoryLocalId: parseInt(id) },
      relations: [
        'address',
        'address.city', 
        'categoryLocal',
      ],
      select: {
        id: true,
        name: true,
        description: true,
        cellphone: true,
        address: {
          id:true,
          street: true,
          city:{
            id:true,
            name:true
          }as any,
        }as any,
        categoryLocal: {
          id: true,
          name:true,
        }as any
      }
    });

    res.json(locals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}; 