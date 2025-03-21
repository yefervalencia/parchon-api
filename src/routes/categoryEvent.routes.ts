import Router from "express";
import {
  createCategoryEvent,
  getCategoriesEvents,
  getCategoryEvent,
  updateCategoryEvent,
  deleteCategoryEvent,
} from "../controllers/CategoryEvents.controller";

const categoryEventRoutes = Router();

categoryEventRoutes.post("/", createCategoryEvent);
categoryEventRoutes.get("/", getCategoriesEvents);
categoryEventRoutes.get("/:id", getCategoryEvent);
categoryEventRoutes.put("/:id", updateCategoryEvent);
categoryEventRoutes.delete("/:id", deleteCategoryEvent);

export default categoryEventRoutes;