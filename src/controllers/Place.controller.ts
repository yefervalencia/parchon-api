import { RequestHandler } from "express";
import { Places } from "../entities/Places";

// Crear un nuevo lugar
export const createPlace: RequestHandler = async (req, res) => {
  try {
    const { name, description, cellphone, addressId, categoryPlaceId } = req.body;

    const place = new Places();
    place.name = name;
    place.description = description;
    place.cellphone = cellphone;
    place.addressId = addressId;
    place.categoryPlaceId = categoryPlaceId;

    await place.save();

    res.status(201).json(place);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los lugares
export const getPlaces: RequestHandler = async (req, res) => {
  try {
    const places = await Places.find();
    res.json(places);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un lugar por ID
export const getPlace: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Places.findOneBy({ id: parseInt(id) });

    if (!place) {
      res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un lugar
export const updatePlace: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Places.findOneBy({ id: parseInt(id) });

    if (!place) {
      res.status(404).json({ message: "Place not found" });
    }

    await Places.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un lugar
export const deletePlace: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Places.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Place not found" });
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