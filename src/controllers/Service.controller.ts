import { RequestHandler } from "express";
import { Services } from "../entities/Services";

// Crear un nuevo servicio
export const createService: RequestHandler = async (req, res) => {
  try {
    const { name, description, addressId, cellphone, categoryServiceId } = req.body;

    const service = new Services();
    service.name = name;
    service.description = description;
    service.addressId = addressId;
    service.cellphone = cellphone;
    service.categoryServiceId = categoryServiceId;

    await service.save();

    res.status(201).json(service);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los servicios
export const getServices: RequestHandler = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un servicio por ID
export const getService: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Services.findOneBy({ id: parseInt(id) });

    if (!service) {
      res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un servicio
export const updateService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Services.findOneBy({ id: parseInt(id) });

    if (!service) {
      res.status(404).json({ message: "Service not found" });
    }

    await Services.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un servicio
export const deleteService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Services.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Service not found" });
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