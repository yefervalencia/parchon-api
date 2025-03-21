import Router from "express";
import {
  createImage,
  getImages,
  getImagesFullData,
  updateImage,
  deleteImage,
  getImage,
} from "../controllers/ImagePlace.controller";
import upload from "../config/multer";

const imagePlaceRouter = Router();

// Subir una imagen
imagePlaceRouter.post("/", upload.single("image"), createImage);

// Obtener todas las imágenes
imagePlaceRouter.get("/", getImages);

// Obtener todas las imágenes con datos completos
imagePlaceRouter.get("/full", getImagesFullData);

// Obtener una imagen por su ID
imagePlaceRouter.get("/:id", getImage);

// Actualizar una imagen
imagePlaceRouter.put("/:id", updateImage);

// Eliminar una imagen
imagePlaceRouter.delete("/:id", deleteImage);

export default imagePlaceRouter;