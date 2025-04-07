import { RequestHandler } from "express";
import { Locals } from "../entities/Locals";

// Crear un nuevo local
export const createLocal: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      cellphone,
      addressId,
      ownerId,
      categoryLocalId,
    } = req.body;

    const local = new Locals();
    local.name = name;
    local.description = description;
    local.cellphone = cellphone;
    local.addressId = addressId;
    local.ownerId = ownerId;
    local.categoryLocalId = categoryLocalId;

    await local.save();

    res.status(201).json(local);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los locales
export const getLocals: RequestHandler = async (req, res) => {
  try {
    const locals = await Locals.find();
    res.json(locals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getLocalsByOwnerId: RequestHandler = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const locals = await Locals.find({
      where: { ownerId: parseInt(ownerId) },
      relations: ['address','address.city' ,'categoryLocal']
    });

    if (!locals || locals.length === 0) {
      res.status(404).json({ message: "Locals not found for this owner" });
    }

    res.json(locals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

// Obtener un local por ID
export const getLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const local = await Locals.findOne({
      where: { id: parseInt(id) },
      relations: [
        'address',
        'address.city', 
        'categoryLocal'
      ]
    });
    
    if (!local) {
      res.status(404).json({ message: "Local not found" });
    }

    res.json(local);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un local
export const updateLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const local = await Locals.findOneBy({ id: parseInt(id) });

    if (!local) {
      res.status(404).json({ message: "Local not found" });
    }

    await Locals.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un local
export const deleteLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Locals.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Local not found" });
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