import Router from "express";
import {
  createLocal,
  getLocals,
  getLocal,
  updateLocal,
  deleteLocal,
  getLocalsByOwnerId,
  getLocalsAdmin,
} from "../controllers/Local.controller";

const localRouter = Router();

localRouter.post("/", createLocal);
localRouter.get("/", getLocals);
localRouter.get("/admins", getLocalsAdmin);
localRouter.get("/:id", getLocal);
localRouter.put("/:id", updateLocal);
localRouter.get("/owner/:ownerId", getLocalsByOwnerId);
localRouter.delete("/:id", deleteLocal);


export default localRouter;