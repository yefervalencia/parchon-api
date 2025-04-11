import Router from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventsByOwnerId,
  getEventImages,
} from "../controllers/Event.controller";

const eventRoutes = Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEvent);
eventRoutes.get("/owner/:ownerId",getEventsByOwnerId)
eventRoutes.put("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);
eventRoutes.get("/:id/images", getEventImages);

export default eventRoutes;