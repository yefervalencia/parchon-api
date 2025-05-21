import Router from "express";
import {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  getPlaceImages,
  getLatestPlaces,
} from "../controllers/Place.controller";

const placeRoutes = Router();

placeRoutes.post("/", createPlace);
placeRoutes.get("/", getPlaces);
placeRoutes.get("/lastest", getLatestPlaces);
placeRoutes.get("/:id", getPlace);
placeRoutes.put("/:id", updatePlace);
placeRoutes.delete("/:id", deletePlace);
placeRoutes.get("/:id/images", getPlaceImages);


export default placeRoutes;