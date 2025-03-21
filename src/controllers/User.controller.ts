import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";
import { Users } from "../entities/Users";
import { Cities } from "../entities/Cities";
import { Roles } from "../entities/Roles";
import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

// Crear un nuevo usuario
export const createUser: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      cellphone,
      birthDate,
      cityId,
      roleId,
    } = req.body;

    // Buscar la ciudad y el rol por sus IDs
    const city = await Cities.findOneBy({ id: cityId });
    const role = await Roles.findOneBy({ id: roleId });

    const user = new Users();

    if (!city) {
      res.status(400).json({ message: "City not found" });
    } else {
      user.city = city;
    }

    if (!role) {
      res.status(400).json({ message: "Role not found" });
    } else {
      user.role = role;
    }

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.password = hashPassword(password);
    user.cellphone = cellphone;
    user.birthDate = birthDate;

    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
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

    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Iniciar sesión de usuario
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
      select: ["id", "name", "lastName", "email", "password"],
      relations: ["role"],
    });

    if (!user || !verifyPassword(password, user.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Generar token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          role: user.role.name,
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
        .json({ message: "Login successful", user });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Cerrar sesión de usuario
export const logoutUser: RequestHandler = (req, res) => {
  res
    .clearCookie(COOKIE_SECRET_KEY, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Obtener todos los usuarios
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Actualizar un usuario
export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOneBy({ id: parseInt(id) });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await Users.update({ id: parseInt(id) }, req.body);
    const updatedUser = await Users.findOneBy({ id: parseInt(id) });
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Eliminar un usuario
export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Users.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "User not found" });
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

// Obtener un usuario por ID
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOneBy({ id: parseInt(id) });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Obtener el usuario actual mediante la cookie
export const getUserByCookie: RequestHandler = async (req, res) => {
  try {
    // Obtener el ID del usuario directamente desde el token
    const userId = TokenUtils.getUserIdFromRequest(req);

    if (!userId) {
      res.status(401).json({ message: "No token provided or invalid token" });
    }

    if (userId === null) {
      res.status(401).json({ message: "No token provided or invalid token" });
      return;
    }

    const user = await Users.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getUserByCookie:", err);
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

// Obtener el rol del usuario mediante la cookie
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