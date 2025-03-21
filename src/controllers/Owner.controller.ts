import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";
import { Owners } from "../entities/Owners";
import { Roles } from "../entities/Roles";
import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

// Crear un nuevo propietario
export const createOwner: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      lastName,
      cellphone,
      identification,
      email,
      password,
      roleId,
    } = req.body;

    // Buscar el rol por su ID
    const role = await Roles.findOneBy({ id: roleId });

    const owner = new Owners();

    if (!role) {
      res.status(400).json({ message: "Role not found" });
    } else {
      owner.role = role;
    }

    owner.name = name;
    owner.lastName = lastName;
    owner.cellphone = cellphone;
    owner.identification = identification;
    owner.email = email;
    owner.password = hashPassword(password);

    await owner.save();

    const token = jwt.sign(
      {
        id: owner.id,
        email: owner.email,
        name: owner.name,
        lastName: owner.lastName,
        role: owner.role.name,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Crear cookie con el token
    res.cookie(COOKIE_SECRET_KEY, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000 * 24, // 1 día
      secure: false, //process.env.NODE_ENV === "production",
    });

    res.status(201).json(owner);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Iniciar sesión de propietario
export const loginOwner: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owners.findOne({
      where: { email },
      select: ["id", "name", "lastName", "email", "password"],
      relations: ["role"],
    });

    if (!owner || !verifyPassword(password, owner.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Generar token
      const token = jwt.sign(
        {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          lastName: owner.lastName,
          role: owner.role.name,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res
        .cookie(COOKIE_SECRET_KEY, token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 3600000 * 24,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .status(200)
        .json({ message: "Login successful", owner });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Cerrar sesión de propietario
export const logoutOwner: RequestHandler = (req, res) => {
  res
    .clearCookie(COOKIE_SECRET_KEY, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Obtener todos los propietarios
export const getOwners: RequestHandler = async (req, res) => {
  try {
    const owners = await Owners.find();
    res.json(owners);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un propietario por ID
export const getOwner: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await Owners.findOneBy({ id: parseInt(id) });

    if (!owner) {
      res.status(404).json({ message: "Owner not found" });
    }

    res.json(owner);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un propietario
export const updateOwner: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Owners.findOneBy({ id: parseInt(id) });

    if (!owner) {
      res.status(404).json({ message: "Owner not found" });
    }

    await Owners.update({ id: parseInt(id) }, req.body);
    const updatedOwner = await Owners.findOneBy({ id: parseInt(id) });
    res.status(200).json(updatedOwner);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un propietario
export const deleteOwner: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Owners.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Owner not found" });
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

// Obtener el propietario actual mediante la cookie
export const getOwnerByCookie: RequestHandler = async (req, res) => {
  try {
    // Obtener el ID del propietario directamente desde el token
    const ownerId = TokenUtils.getUserIdFromRequest(req);

    if (!ownerId) {
      res.status(401).json({ message: "No token provided or invalid token" });
    }

    if (ownerId === null) {
      res.status(401).json({ message: "No token provided or invalid token" });
      return;
    }

    const owner = await Owners.findOneBy({ id: ownerId });
    if (!owner) {
      res.status(404).json({ message: "Owner not found" });
      return;
    }

    res.json(owner);
  } catch (err) {
    console.error("Error in getOwnerByCookie:", err);
    res.status(500).json({
      message: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Verificar si existe una cookie de sesión
export const getCookieExists: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_SECRET_KEY];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
    const isAuthenticated = !!decoded && typeof decoded.id === "number";

    res.json({ isAuthenticated });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error:", err);
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener el rol del propietario mediante la cookie
export const getRoleByCookie: RequestHandler = async (req, res) => {
  try {
    const role = TokenUtils.getRoleFromRequest(req);

    if (!role) {
      res.status(401).json({ message: "No token provided" });
    }

    res.json({ role });
  } catch (err) {
    console.error("Error in getRoleByCookie:", err);
    res.status(500).json({
      message: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};