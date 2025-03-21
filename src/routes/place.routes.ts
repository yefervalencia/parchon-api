import Router from "express";
import {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
} from "../controllers/Place.controller";

const placeRoutes = Router();

placeRoutes.post("/", createPlace);
placeRoutes.get("/", getPlaces);
placeRoutes.get("/:id", getPlace);
placeRoutes.put("/:id", updatePlace);
placeRoutes.delete("/:id", deletePlace);

export default placeRoutes;