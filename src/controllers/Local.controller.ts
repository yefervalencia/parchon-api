import { RequestHandler } from "express";
import { Locals } from "../entities/Locals";
import { ImagesLocals } from "../entities/ImagesLocals";
import { Events } from "../entities/Events";

// Crear un nuevo local
export const createLocal: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      cellphone,
      addressId,
      ownerId,
      categoryLocalId,
    } = req.body;

    const local = new Locals();
    local.name = name;
    local.description = description;
    local.cellphone = cellphone;
    local.addressId = addressId;
    local.ownerId = ownerId;
    local.categoryLocalId = categoryLocalId;

    await local.save();

    res.status(201).json(local);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener todos los locales
export const getLocals: RequestHandler = async (req, res) => {
  try {
    const locals = await Locals.find();
    res.json(locals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
export const getLocalsByOwnerId: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { ownerId } = req.params;
    const numericOwnerId = parseInt(ownerId, 10);

    // Validar que ownerId sea un número válido
    if (isNaN(numericOwnerId)) {
      res.status(400).json({ message: 'ownerId inválido' });
      return; // Detiene la ejecución sin retornar un valor
    }

    const locals = await Locals.find({
      where: { ownerId: numericOwnerId },
      relations: ['address', 'address.city', 'categoryLocal']
    });

    // Si no se encuentran locales, se envía el error y se detiene la ejecución
    if (!locals || locals.length === 0) {
      res.status(404).json({ message: "No se encontraron locales para este propietario" });
      return;
    }

    res.json(locals);
    return; // Fin de la función sin retornar un valor
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Error desconocido en el servidor" });
  }
};

// Obtener un local por ID
export const getLocal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const local = await Locals.findOne({
      where: { id: parseInt(id) },
      relations: [
        'address',
        'address.city', 
        'categoryLocal',
      ],
      select: {
        id: true,
        name: true,
        description: true,
        cellphone: true,
        address: {
          id:true,
          street: true,
          city:{
            id:true,
            name:true
          }as any,
        }as any,
        categoryLocal: {
          id: true,
          name:true,
        }as any
      }
    });
    
    if (!local) {
      res.status(404).json({ message: "Local not found" });
      return;
    }

    res.json(local);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un local
export const updateLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const local = await Locals.findOneBy({ id: parseInt(id) });

    if (!local) {
      res.status(404).json({ message: "Local not found" });
    }

    await Locals.update({ id: parseInt(id) }, req.body);

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un local
export const deleteLocal: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Locals.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Local not found" });
      return;
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

// obtener las imagenes del local
export const getLocalImages: RequestHandler = async (req,res) => {
  try {
    const {id} =req.params;
    const local = await Locals.findOneBy({ id: parseInt(id)});
    if(!local) {
      res.status(404).json({ messsage : " service not found"});
    }

    const images= await ImagesLocals.find({
      where : { localId: parseInt(id)},
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

// obtener los eventos de ese local
export const getLocalEvents: RequestHandler = async (req,res) => {
  try {
    const {id} =req.params;
    const local = await Locals.findOneBy({ id: parseInt(id)});
    if(!local) {
      res.status(404).json({ messsage : " lcaol not found"});
    }

    const events= await Events.find({
      where : { localId: parseInt(id)},
      relations: ["local", "categoryEvent", "local.address"],
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        startDate: true,
        endDate: true,
        local: {
          id: true,
          name: true,
          cellphone: true,
          ownerId: true,
          address: {
            id: true,
            street: true,
          } as any,
        } as any,
        categoryEvent: {
          id: true,
          name: true,
        } as any,
      },
    });
    res.json(events);
  }catch(err){
    if (err instanceof Error) {
      res.status(500).json({message: err.message})
    }else {
      res.status(500).json({message: "uknow error ocurred"});
    }
  }
};

// Obtener los 3 locales más recientes
export const getLatestLocals: RequestHandler = async (req, res) => {
  try {
    const locals = await Locals.find({
      order: { id: "DESC" }, // Usa "id" si no tienes createdAt
      take: 3,
      relations: [
        'address',
        'address.city', 
        'categoryLocal',
      ],
      select: {
        id: true,
        name: true,
        description: true,
        cellphone: true,
        address: {
          id:true,
          street: true,
          city:{
            id:true,
            name:true
          }as any,
        }as any,
        categoryLocal: {
          id: true,
          name:true,
        }as any
      }
    });

    res.json(locals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
