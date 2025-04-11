import { RequestHandler } from "express";
import { Events } from "../entities/Events";
import { ImagesEvents } from "../entities/ImagesEvents";

// Crear un nuevo evento
export const createEvent: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      capacity,
      startDate,
      endDate,
      localId,
      categoryEventId,
    } = req.body;

    const event = new Events();
    event.name = name;
    event.description = description;
    event.capacity = capacity;
    event.startDate = new Date(startDate);
    event.endDate = new Date(endDate);
    event.localId = localId;
    event.categoryEventId = categoryEventId;

    await event.save();

    res.status(201).json(event);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los eventos
export const getEvents: RequestHandler = async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un evento por ID
export const getEvent: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Events.findOneBy({ id: parseInt(id) });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un evento
export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Events.findOneBy({ id: parseInt(id) });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    }

    await Events.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un evento
export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Events.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Event not found" });
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

export const getEventImages: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Events.findOneBy({ id: parseInt(id) });
    if (!event) {
      res.status(404).json({ message: "event not found" });
    }

    const images = await ImagesEvents.find({
      where: { eventId: parseInt(id) },
    });

    res.json(images);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};