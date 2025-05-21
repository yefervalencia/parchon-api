import Router from "express";
import {
  createLocal,
  getLocals,
  getLocal,
  updateLocal,
  deleteLocal,
  getLocalsByOwnerId,
  getLocalImages,
  getLocalEvents,
  getLatestLocals,
} from "../controllers/Local.controller";

const localRouter = Router();

localRouter.post("/", createLocal);
localRouter.get("/", getLocals);
localRouter.get("/lastest", getLatestLocals);
localRouter.get("/:id", getLocal);
localRouter.put("/:id", updateLocal);
localRouter.get("/owner/:ownerId", getLocalsByOwnerId);
localRouter.delete("/:id", deleteLocal);
localRouter.get("/:id/images", getLocalImages);
localRouter.get("/:id/events", getLocalEvents);


export default localRouter;