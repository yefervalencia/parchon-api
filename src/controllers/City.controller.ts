import { RequestHandler } from "express";
import { Cities } from "../entities/Cities";

// Crear una nueva ciudad
export const createCity: RequestHandler = async (req, res) => {
  try {
    const { name, departmentId } = req.body;

    const city = new Cities();
    city.name = name;
    city.departmentId = departmentId;

    await city.save();

    res.status(201).json(city);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las ciudades
export const getCities: RequestHandler = async (req, res) => {
  try {
    const cities = await Cities.find();
    res.json(cities);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una ciudad por ID
export const getCity: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await Cities.findOneBy({ id: parseInt(id) });

    if (!city) {
      res.status(404).json({ message: "City not found" });
    }

    res.json(city);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una ciudad
export const updateCity: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await Cities.findOneBy({ id: parseInt(id) });

    if (!city) {
      res.status(404).json({ message: "City not found" });
    }

    await Cities.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una ciudad
export const deleteCity: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Cities.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "City not found" });
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