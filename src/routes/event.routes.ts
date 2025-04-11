import Router from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventImages,
} from "../controllers/Event.controller";

const eventRoutes = Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEvent);
eventRoutes.put("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);
eventRoutes.get("/:id/images", getEventImages);

export default eventRoutes;