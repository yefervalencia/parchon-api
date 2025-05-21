import Router from "express";
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
  getServiceImages,
  getLatestServices,
} from "../controllers/Service.controller";

const serviceRouter = Router();

serviceRouter.post("/", createService);
serviceRouter.get("/", getServices);
serviceRouter.get("/lastest", getLatestServices);
serviceRouter.get("/:id", getService);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);
serviceRouter.get("/:id/images", getServiceImages);

export default serviceRouter;