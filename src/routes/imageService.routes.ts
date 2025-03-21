import Router from "express";
import {
  createImage,
  getImages,
  getImagesFullData,
  updateImage,
  deleteImage,
  getImage,
} from "../controllers/ImageService.controller";
import upload from "../config/multer";

const imageServiceRouter = Router();

// Subir una imagen
imageServiceRouter.post("/", upload.single("image"), createImage);

// Obtener todas las imágenes
imageServiceRouter.get("/", getImages);

// Obtener todas las imágenes con datos completos
imageServiceRouter.get("/full", getImagesFullData);

// Obtener una imagen por su ID
imageServiceRouter.get("/:id", getImage);

// Actualizar una imagen
imageServiceRouter.put("/:id", updateImage);

// Eliminar una imagen
imageServiceRouter.delete("/:id", deleteImage);

export default imageServiceRouter;