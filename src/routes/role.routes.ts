import Router from "express";
import {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
} from "../controllers/Role.controller";

const roleRouter = Router();

roleRouter.post("/", createRole);
roleRouter.get("/", getRoles);
roleRouter.get("/:id", getRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;