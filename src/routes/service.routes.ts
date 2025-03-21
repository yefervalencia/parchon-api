import Router from "express";
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/Service.controller";

const serviceRouter = Router();

serviceRouter.post("/", createService);
serviceRouter.get("/", getServices);
serviceRouter.get("/:id", getService);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;