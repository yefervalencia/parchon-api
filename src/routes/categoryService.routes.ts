import Router from "express";
import {
  createCategoryService,
  getCategoriesServices,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../controllers/CategoryService.controller";

const categoryServiceRoutes = Router();

categoryServiceRoutes.post("/", createCategoryService);
categoryServiceRoutes.get("/", getCategoriesServices);
categoryServiceRoutes.get("/:id", getCategoryService);
categoryServiceRoutes.put("/:id", updateCategoryService);
categoryServiceRoutes.delete("/:id", deleteCategoryService);

export default categoryServiceRoutes;