import Router from "express";
import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getCitiesByDepartment,
} from "../controllers/Department.controller";

const departmentRoutes = Router();

departmentRoutes.post("/", createDepartment);
departmentRoutes.get("/", getDepartments);
departmentRoutes.get("/:id", getDepartment);
departmentRoutes.put("/:id", updateDepartment);
departmentRoutes.delete("/:id", deleteDepartment);
departmentRoutes.get("/:id/cities", getCitiesByDepartment);

export default departmentRoutes;