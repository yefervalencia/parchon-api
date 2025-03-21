import { RequestHandler } from "express";
import cloudinary from "../config/cloudinary";
import { ImagesPlaces } from "../entities/ImagesPlaces";
import { Places } from "../entities/Places";
import fs from "fs";
import upload from "../config/multer";

export const createImage: RequestHandler = async (req, res) => {
  try {
    const { placeId } = req.body;

    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    // Subir la imagen a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "place_images", // Carpeta en Cloudinary
    });

    // Eliminar el archivo temporal
    fs.unlinkSync(file.path);

    // Buscar el place asociado
    const place = await Places.findOneBy({ id: placeId });

    if (!place) {
      res.status(404).json({ message: "place not found" });
    }

    // Crear una nueva imagen en la base de datos
    const newImage = new ImagesPlaces();
    newImage.url = uploadResult.secure_url;
    newImage.placeId = placeId;
    newImage.createdAt = new Date();

    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export const getImages: RequestHandler = async (req, res) => {
  try {
    const images = await ImagesPlaces.find({ relations: ["place"] });
    res.json(images);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export const getImagesFullData: RequestHandler = async (req, res) => {
  try {
    const images = await ImagesPlaces.createQueryBuilder("image")
      .leftJoinAndSelect("image.place", "place")
      .select([
        "image.id",
        "image.url",
        "image.createdAt",
        "place.id",
      ])
      .getMany();

    res.json(images);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export const updateImage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await ImagesPlaces.findOneBy({ id: parseInt(id) });

    if (!image) {
      res.status(404).json({ message: "Image not found" });
    }

    // Actualizar la imagen en la base de datos
    await ImagesPlaces.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export const deleteImage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await ImagesPlaces.findOneBy({ id: parseInt(id) });

    if (!image) {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    // Eliminar la imagen de Cloudinary
    const publicId = image.url.split("/").pop()?.split(".")[0]; // Extraer el public_id de la URL
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Eliminar la imagen de la base de datos
    await image.remove();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export const getImage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await ImagesPlaces.findOneBy({ id: parseInt(id) });

    if (!image) {
      res.status(404).json({ message: "Image not found" });
    }

    res.json(image);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

