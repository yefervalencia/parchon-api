import { RequestHandler } from "express";
import { Addresses } from "../entities/Addresses";

// Crear una nueva dirección
export const createAddress: RequestHandler = async (req, res) => {
  try {
    const { street, cityId } = req.body;

    const address = new Addresses();
    address.street = street;
    address.cityId = cityId;

    await address.save();

    res.status(201).json(address);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todas las direcciones
export const getAddresses: RequestHandler = async (req, res) => {
  try {
    const addresses = await Addresses.find();
    res.json(addresses);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener una dirección por ID
export const getAddress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Addresses.findOneBy({ id: parseInt(id) });

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    res.json(address);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar una dirección
export const updateAddress: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Addresses.findOneBy({ id: parseInt(id) });

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    await Addresses.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar una dirección
export const deleteAddress: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Addresses.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Address not found" });
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
