import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";
import { Admins } from "../entities/Admins";
import { Roles } from "../entities/Roles";
import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

// Crear un nuevo administrador
export const createAdmin: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    // Buscar el rol por su ID
    const role = await Roles.findOneBy({ id: roleId });

    const admin = new Admins();

    if (!role) {
      res.status(400).json({ message: "Role not found" });
    } else {
      admin.role = role;
    }

    admin.name = name;
    admin.email = email;
    admin.password = hashPassword(password);

    await admin.save();

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role.name,
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

    res.status(201).json(admin);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Iniciar sesión de administrador
export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admins.findOne({
      where: { email },
      select: ["id", "name", "email", "password"],
      relations: ["role"],
    });

    if (!admin || !verifyPassword(password, admin.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Generar token
      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role.name,
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
        .json({ message: "Login successful", admin });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Cerrar sesión de administrador
export const logoutAdmin: RequestHandler = (req, res) => {
  res
    .clearCookie(COOKIE_SECRET_KEY, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Obtener todos los administradores
export const getAdmins: RequestHandler = async (req, res) => {
  try {
    const admins = await Admins.find();
    res.json(admins);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener un administrador por ID
export const getAdmin: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admins.findOneBy({ id: parseInt(id) });

    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un administrador
export const updateAdmin: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admins.findOneBy({ id: parseInt(id) });

    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    }

    await Admins.update({ id: parseInt(id) }, req.body);
    const updatedAdmin = await Admins.findOneBy({ id: parseInt(id) });
    res.status(200).json(updatedAdmin);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un administrador
export const deleteAdmin: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Admins.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Admin not found" });
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

// Obtener el administrador actual mediante la cookie
export const getAdminByCookie: RequestHandler = async (req, res) => {
  try {
    // Obtener el ID del administrador directamente desde el token
    const adminId = TokenUtils.getUserIdFromRequest(req);

    if (!adminId) {
      res.status(401).json({ message: "No token provided or invalid token" });
    }

    if (adminId === null) {
      res.status(401).json({ message: "No token provided or invalid token" });
      return;
    }

    const admin = await Admins.findOneBy({ id: adminId });
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    res.json(admin);
  } catch (err) {
    console.error("Error in getAdminByCookie:", err);
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

// Obtener el rol del administrador mediante la cookie
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