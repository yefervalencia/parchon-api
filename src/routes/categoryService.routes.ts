import Router from "express";
import {
  createCategoryService,
  getCategoriesServices,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getServicesByCategory,
} from "../controllers/CategoryService.controller";

const categoryServiceRoutes = Router();

categoryServiceRoutes.post("/", createCategoryService);
categoryServiceRoutes.get("/", getCategoriesServices);
categoryServiceRoutes.get("/:id", getCategoryService);
categoryServiceRoutes.put("/:id", updateCategoryService);
categoryServiceRoutes.delete("/:id", deleteCategoryService);
categoryServiceRoutes.get("/:id/services", getServicesByCategory)

export default categoryServiceRoutes;