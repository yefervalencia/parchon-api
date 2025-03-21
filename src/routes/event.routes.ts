import Router from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/Event.controller";

const eventRoutes = Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEvent);
eventRoutes.put("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);

export default eventRoutes;