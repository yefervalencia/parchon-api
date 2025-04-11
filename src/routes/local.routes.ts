import Router from "express";
import {
  createLocal,
  getLocals,
  getLocal,
  updateLocal,
  deleteLocal,
  getLocalsByOwnerId,
} from "../controllers/Local.controller";

const localRouter = Router();

localRouter.post("/", createLocal);
localRouter.get("/", getLocals);
localRouter.get("/:id", getLocal);
localRouter.put("/:id", updateLocal);
localRouter.get("/owner/:ownerId", getLocalsByOwnerId);
localRouter.delete("/:id", deleteLocal);

export default localRouter;