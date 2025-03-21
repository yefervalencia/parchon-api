import Router from "express";
import {
  createCategoryLocal,
  getCategoriesLocals,
  getCategoryLocal,
  updateCategoryLocal,
  deleteCategoryLocal,
} from "../controllers/CategoryLocal.controller";

const categoryLocalRoutes = Router();

categoryLocalRoutes.post("/", createCategoryLocal);
categoryLocalRoutes.get("/", getCategoriesLocals);
categoryLocalRoutes.get("/:id", getCategoryLocal);
categoryLocalRoutes.put("/:id", updateCategoryLocal);
categoryLocalRoutes.delete("/:id", deleteCategoryLocal);

export default categoryLocalRoutes;