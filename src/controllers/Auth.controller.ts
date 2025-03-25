import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";
import { Admins } from "../entities/Admins";
import { Owners } from "../entities/Owners";
import { Users } from "../entities/Users";
import { Roles } from "../entities/Roles";
import { Cities } from "../entities/Cities";
import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

export const register: RequestHandler = async (req, res) => {
  try {
    const { roleId } = req.body;

    if (![1, 2, 3].includes(roleId)) {
      res.status(400).json({ message: "Invalid role ID" });
      return;
    }

    const role = await Roles.findOneBy({ id: roleId });
    if (!role) {
      res.status(400).json({ message: "Role not found" });
      return;
    }

    let newUser;
    let tokenPayload;

    switch (roleId) {
      case 1:
        const {
          name,
          lastName,
          email,
          password,
          cellphone,
          birthDate,
          cityId,
        } = req.body;

        const city = await Cities.findOneBy({ id: cityId });
        if (!city) {
          res.status(400).json({ message: "City not found" });
          return;
        }

        const user = new Users();
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = hashPassword(password);
        user.cellphone = cellphone;
        user.birthDate = birthDate;
        user.city = city;
        user.roleId = roleId;

        await user.save();
        newUser = user;

        tokenPayload = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          role: user.roleId,
        };
        break;

      case 2:
        const {
          name: ownerName,
          lastName: ownerLastName,
          cellphone: ownerCellphone,
          identification,
          email: ownerEmail,
          password: ownerPassword,
        } = req.body;

        const owner = new Owners();
        owner.name = ownerName;
        owner.lastName = ownerLastName;
        owner.cellphone = ownerCellphone;
        owner.identification = identification;
        owner.email = ownerEmail;
        owner.password = hashPassword(ownerPassword);
        owner.roleId = roleId;

        await owner.save();
        newUser = owner;

        tokenPayload = {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          lastName: owner.lastName,
          role: owner.roleId,
        };
        break;

      case 3:
        const {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
        } = req.body;

        const admin = new Admins();
        admin.name = adminName;
        admin.email = adminEmail;
        admin.password = hashPassword(adminPassword);
        admin.roleId = roleId;

        await admin.save();
        newUser = admin;

        tokenPayload = {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.roleId,
        };
        break;

      default:
        res.status(400).json({ message: "Invalid role ID" });
        return;
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie(COOKIE_SECRET_KEY, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000 * 24,
      secure: false, //process.env.NODE_ENV === "production",
    });

    res.status(201).json(newUser);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Unknown error occurred" });
    return;
  }
};

// Login genérico para todos los tipos de usuarios
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user: Users | Owners | Admins | null = await Users.findOne({
      where: { email },
      select: ["id", "name", "lastName", "email", "password"],
      relations: ["role"],
    });

    if (!user) {
      user = await Owners.findOne({
        where: { email },
        select: ["id", "name", "lastName", "email", "password"],
        relations: ["role"],
      });
    }

    if (!user) {
      user = await Admins.findOne({
        where: { email },
        select: ["id", "name", "email", "password"],
        relations: ["role"],
      });
    }

    if (!user || !verifyPassword(password, user.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    let tokenPayload;
    if (user instanceof Users) {
      tokenPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
      };
    } else if (user instanceof Owners) {
      tokenPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
      };
    } else if (user instanceof Admins) {
      tokenPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      };
    } else {
      res.status(500).json({ message: "Unknown user type" });
      return;
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie(COOKIE_SECRET_KEY, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000 * 24,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

// Logout genérico
export const logout: RequestHandler = (req, res) => {
  res
    .clearCookie(COOKIE_SECRET_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Obtener usuario actual mediante cookie
export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const userId = TokenUtils.getUserIdFromRequest(req);
    const role = TokenUtils.getRoleFromRequest(req);

    if (!userId || !role) {
      res.status(401).json({ message: "No token provided or invalid token" });
      return;
    }

    let user;
    switch (role.toLowerCase()) {
      case "user":
        user = await Users.findOneBy({ id: userId });
        break;
      case "owner":
        user = await Owners.findOneBy({ id: userId });
        break;
      case "admin":
        user = await Admins.findOneBy({ id: userId });
        break;
      default:
        res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

// Verificar si existe cookie de sesión
export const checkAuth: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_SECRET_KEY];

    if (!token) {
      res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
    const isAuthenticated = !!decoded && typeof decoded.id === "number";

    res.json({ isAuthenticated });
  } catch (err) {
    res.status(500).json({ isAuthenticated: false });
  }
};

// Obtener rol del usuario actual
export const getCurrentRole: RequestHandler = async (req, res) => {
  try {
    const role = TokenUtils.getRoleFromRequest(req);

    if (!role) {
      res.status(401).json({ message: "No token provided" });
    }

    res.json({ role });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};