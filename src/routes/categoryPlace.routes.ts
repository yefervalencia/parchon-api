import Router from "express";
import {
  createCategoryPlace,
  getCategoriesPlaces,
  getCategoryPlace,
  updateCategoryPlace,
  deleteCategoryPlace,
} from "../controllers/CategoryPlace.controller";

const categoryPlaceRoutes = Router();

categoryPlaceRoutes.post("/", createCategoryPlace);
categoryPlaceRoutes.get("/", getCategoriesPlaces);
categoryPlaceRoutes.get("/:id", getCategoryPlace);
categoryPlaceRoutes.put("/:id", updateCategoryPlace);
categoryPlaceRoutes.delete("/:id", deleteCategoryPlace);

export default categoryPlaceRoutes;