import Router from "express";
import {
  createCategoryPlace,
  getCategoriesPlaces,
  getCategoryPlace,
  updateCategoryPlace,
  deleteCategoryPlace,
  getPlacesByCategory,
} from "../controllers/CategoryPlace.controller";

const categoryPlaceRoutes = Router();

categoryPlaceRoutes.post("/", createCategoryPlace);
categoryPlaceRoutes.get("/", getCategoriesPlaces);
categoryPlaceRoutes.get("/:id", getCategoryPlace);
categoryPlaceRoutes.put("/:id", updateCategoryPlace);
categoryPlaceRoutes.delete("/:id", deleteCategoryPlace);
categoryPlaceRoutes.get("/:id/places", getPlacesByCategory);

export default categoryPlaceRoutes;