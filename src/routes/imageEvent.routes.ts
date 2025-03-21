import Router from "express";
import {
  createImage,
  getImages,
  getImagesFullData,
  updateImage,
  deleteImage,
  getImage,
} from "../controllers/ImageEvent.controller";
import upload from "../config/multer";

const imageEventRouter = Router();

// Subir una imagen
imageEventRouter.post("/", upload.single("image"), createImage);

// Obtener todas las imágenes
imageEventRouter.get("/", getImages);

// Obtener todas las imágenes con datos completos
imageEventRouter.get("/full", getImagesFullData);

// Obtener una imagen por su ID
imageEventRouter.get("/:id", getImage);

// Actualizar una imagen
imageEventRouter.put("/:id", updateImage);

// Eliminar una imagen
imageEventRouter.delete("/:id", deleteImage);

export default imageEventRouter;