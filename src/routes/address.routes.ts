import Router from "express";
import {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/Address.controller";

const addressRoutes = Router();

addressRoutes.post("/", createAddress);
addressRoutes.get("/", getAddresses);
addressRoutes.get("/:id", getAddress);
addressRoutes.put("/:id", updateAddress);
addressRoutes.delete("/:id", deleteAddress);

export default addressRoutes;