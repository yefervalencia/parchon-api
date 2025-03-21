import Router from "express";
import {
  createCity,
  getCities,
  getCity,
  updateCity,
  deleteCity,
} from "../controllers/City.controller";

const cityRouter = Router();

cityRouter.post("/", createCity);
cityRouter.get("/", getCities);
cityRouter.get("/:id", getCity);
cityRouter.put("/:id", updateCity);
cityRouter.delete("/:id", deleteCity);

export default cityRouter;