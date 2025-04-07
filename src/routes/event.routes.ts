import Router from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventsByOwnerId
} from "../controllers/Event.controller";

const eventRoutes = Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEvent);
eventRoutes.get("/owner/:id",getEventsByOwnerId)
eventRoutes.put("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);

export default eventRoutes;