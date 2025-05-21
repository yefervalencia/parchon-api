import { RequestHandler } from "express";
import { Services } from "../entities/Services";
import { ImagesServices } from "../entities/ImagesServices";

// Crear un nuevo servicio
export const createService: RequestHandler = async (req, res) => {
  try {
    const { name, description, addressId, cellphone, categoryServiceId } =
      req.body;

    const service = new Services();
    service.name = name;
    service.description = description;
    service.addressId = addressId;
    service.cellphone = cellphone;
    service.categoryServiceId = categoryServiceId;

    await service.save();

    res.status(201).json(service);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los servicios
export const getServices: RequestHandler = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un servicio por ID
export const getService: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Services.findOne({
      where: {id: parseInt(id)},
      relations: [
        'address',
        'address.city',
        'categoryService'
      ],
      select: {
        id:true,
        name: true,
        cellphone: true,
        address: {
          id: true,
          street: true,
          city: {
            id: true,
            name: true,
          }as any,
        }as any,
        categoryService: {
          id: true,
          name: true,
        }as any
      }
    });
    if (!service) {
      res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un servicio
export const updateService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Services.findOneBy({ id: parseInt(id) });

    if (!service) {
      res.status(404).json({ message: "Service not found" });
    }

    await Services.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un servicio
export const deleteService: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Services.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Service not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// obtener las imagenes del servicio
export const getServiceImages: RequestHandler = async (req,res) => {
  try {
    const {id} =req.params;
    const service = await Services.findOneBy({ id: parseInt(id)});
    if(!service) {
      res.status(404).json({ messsage : " service not found"});
    }

    const images= await ImagesServices.find({
      where : { serviceId: parseInt(id)},
    });
    res.json(images);
  }catch(err){
    if (err instanceof Error) {
      res.status(500).json({message: err.message})
    }else {
      res.status(500).json({message: "uknow error ocurred"});
    }
  }
};

// Obtener los 3 servicios más recientes
export const getLatestServices: RequestHandler = async (req, res) => {
  try {
    const services = await Services.find({
      order: { id: "DESC" },
      take: 3,
      relations: [
        'address',
        'address.city',
        'categoryService'
      ],
      select: {
        id:true,
        name: true,
        cellphone: true,
        address: {
          id: true,
          street: true,
          city: {
            id: true,
            name: true,
          }as any,
        }as any,
        categoryService: {
          id: true,
          name: true,
        }as any
      }
    });

    res.json(services);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
