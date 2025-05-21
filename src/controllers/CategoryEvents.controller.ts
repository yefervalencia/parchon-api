import { RequestHandler } from "express";
import { Events } from "../entities/Events";
import { CategoriesEvents } from "../entities/CategoriesEvents";

// Crear una nueva categoría de evento
export const createCategoryEvent: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryEvent = new CategoriesEvents();
    categoryEvent.name = name;

    await categoryEvent.save();

    res.status(201).json(categoryEvent);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las categorías de eventos
export const getCategoriesEvents: RequestHandler = async (req, res) => {
  try {
    const categoriesEvents = await CategoriesEvents.find();
    res.json(categoriesEvents);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una categoría de evento por ID
export const getCategoryEvent: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryEvent = await CategoriesEvents.findOneBy({ id: parseInt(id) });

    if (!categoryEvent) {
      res.status(404).json({ message: "Category event not found" });
    }

    res.json(categoryEvent);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una categoría de evento
export const updateCategoryEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryEvent = await CategoriesEvents.findOneBy({ id: parseInt(id) });

    if (!categoryEvent) {
      res.status(404).json({ message: "Category event not found" });
    }

    await CategoriesEvents.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una categoría de evento
export const deleteCategoryEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CategoriesEvents.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Category event not found" });
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

export const getEventsByCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoriesEvents.findOneBy({ id: parseInt(id) });
    if (!category) {
      res.status(404).json({ message: "category not found" });
    }

    const events = await Events.find({
      where: { categoryEventId: parseInt(id) },
      relations: ["local", "categoryEvent", "local.address"],
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        startDate: true,
        endDate: true,
        local: {
          id: true,
          name: true,
          cellphone: true,
          ownerId: true,
          address: {
            id: true,
            street: true,
          } as any,
        } as any,
        categoryEvent: {
          id: true,
          name: true,
        } as any,
      },
    });

    res.json(events);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}; 