import Router from "express";
import {
  createImage,
  getImages,
  getImagesFullData,
  updateImage,
  deleteImage,
  getImage,
} from "../controllers/ImageLocal.controller";
import upload from "../config/multer";

const imageLocalRouter = Router();

// Subir una imagen
imageLocalRouter.post("/", upload.single("image"), createImage);

// Obtener todas las imágenes
imageLocalRouter.get("/", getImages);

// Obtener todas las imágenes con datos completos
imageLocalRouter.get("/full", getImagesFullData);

// Obtener una imagen por su ID
imageLocalRouter.get("/:id", getImage);

// Actualizar una imagen
imageLocalRouter.put("/:id", updateImage);

// Eliminar una imagen
imageLocalRouter.delete("/:id", deleteImage);

export default imageLocalRouter;